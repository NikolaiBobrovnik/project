import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import render from './render'
import ViewSwitcher from 'ViewSwitcher/ViewSwitcher'
import configureStore from 'Services/store/configureStore'
import { Provider } from 'react-redux'
import { getBundles } from 'react-loadable/webpack'
import Loadable from 'react-loadable'
import MobileDetect from 'mobile-detect'
import NestedStatus from 'react-nested-status'
import { SizesProvider } from 'react-sizes'
import { isDevelopment, isLoadable } from 'utils'
import AsyncActionController from 'HOC/ServerReRender/AsyncActionController'
import serverReRender from 'HOC/ServerReRender/serverReRender'
import { CookiesProvider } from 'react-cookie'

const loadableManifest = process.env.REACT_APP_LOADABLE_MANIFEST || {}

// shows on errors
const ErrorPage = () => <h1>Oops there was an error</h1>

// determine page size for 'react-sizes'
const getSizesFallback = isMobile => {
  if (isMobile) {
    return {
      fallbackWidth: parseInt(process.env.REACT_APP_BASE_WIDTH_MOBILE, 10),
      fallbackHeight: 640
    }
  }
  return {
    fallbackWidth: parseInt(process.env.REACT_APP_BASE_WIDTH_DESKTOP, 10),
    fallbackHeight: 700
  }
}

const reactApp = async (req, res) => {
  const isMobile = new MobileDetect(req.headers['user-agent']).mobile()
  const asyncActionController = new AsyncActionController()
  const store = configureStore(asyncActionController)
  const context = {} // context for static router
  const time = Date.now() // to track render time in log
  let modules = [] // Loadable modules
  let status // result status
  let renderedComponent // result component from renderToString

  // save Loadable modules to get required bundles for client
  const report = moduleName => {
    if (!modules.includes(moduleName)) { // check if moduleName not included, cause may be re-renders
      modules.push(moduleName)
    }
  }

  // get fallback sizes for react-sizes
  const sizesConfig = getSizesFallback(isMobile)

  const { result, error, stats } = await serverReRender({
    maxRenders: 5,
    controller: asyncActionController,
    render: (next, stop) => {
      if (context.url) {
        return stop()
      }
      return next(renderToString(
        <Loadable.Capture report={report}>
          <NestedStatus code={200}>
            <SizesProvider config={sizesConfig}>
              <Provider store={store}>
                <CookiesProvider cookies={req.universalCookies}>
                  <Router context={context} location={req.url}>
                    <ViewSwitcher />
                  </Router>
                </CookiesProvider>
              </Provider>
            </SizesProvider>
          </NestedStatus>
        </Loadable.Capture>
      ))
    }
  })

  if (context.url) {
    res.redirect(301, context.url)
  } else {
    if (error) {
      console.error(error)
      renderedComponent = renderToString(ErrorPage)
      status = 500
    } else {
      renderedComponent = result
      status = NestedStatus.rewind()
    }
    let jsBundles = []
    let cssBundles = []
    if (isLoadable) { // if use Loadable, get chunks
      const bundles = getBundles(loadableManifest, modules) // get Loadable bundles to load on client
        .filter(Boolean) // on dev loadable manifest is empty, clear undefined
        .map(bundle => '/' + bundle.file)
      jsBundles = bundles.filter(bundle => bundle.endsWith('.js')) // separate css and js bundles
      cssBundles = bundles.filter(bundle => bundle.endsWith('.css'))
    }
    const reduxState = store.getState().toJS() // get state to transfer to client
    const helmet = Helmet.renderStatic() // get SEO
    const htmlClass = isMobile ? 'vs-mobile' : 'vs-desktop'
    const elasticAdaptive = {
      baseWidth: isMobile ? process.env.REACT_APP_BASE_WIDTH_MOBILE : process.env.REACT_APP_BASE_WIDTH_DESKTOP,
      widthLimit: isMobile ? false : process.env.REACT_APP_WIDTH_LIMIT_DESKTOP
    }
    const HTML = render(renderedComponent, helmet, reduxState, jsBundles, cssBundles, htmlClass, elasticAdaptive) // get result HTML
    res.status(status).send(HTML)
  }
  if (isDevelopment) {
    console.log(
      `render url ${req.url} in ${Date.now() - time} ms with ${stats.renders} renders and ${stats.actions} API loadings`
    )
  }
}

export default reactApp
