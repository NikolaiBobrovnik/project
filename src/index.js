import React from 'react'
import { render, hydrate } from 'react-dom'
import ViewSwitcher from './ViewSwitcher/ViewSwitcher'
import registerServiceWorker from './registerServiceWorker'
import configureStore from 'Services/store/configureStore'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import { CookiesProvider } from 'react-cookie'
import { isSSR } from 'utils'

const store = configureStore()
console.log(store.getState().toJS())

const Page = (
  <Provider store={store}>
    <BrowserRouter>
      <CookiesProvider>
        <ViewSwitcher />
      </CookiesProvider>
    </BrowserRouter>
  </Provider>
)

const element = document.getElementById('root')

const renderMethod = isSSR ? hydrate : render

// preload all components (from ssr or main script, if loadable option is off)
Loadable.preloadReady().then(() => {
  renderMethod(Page, element)
})

registerServiceWorker()
