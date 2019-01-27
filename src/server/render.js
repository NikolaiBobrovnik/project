/* eslint-disable indent */
import template from 'index.hbs'
import flushChunks from 'webpack-flush-chunks'
import { isLoadable } from 'utils'
import './cycle'

const DEV = process.env.NODE_ENV === 'development'
const assetManifest = JSON.parse(process.env.REACT_APP_ASSET_MANIFEST || '{}')
const webpackStats = process.env.REACT_APP_WEBPACK_STATS || {}

const bundle = DEV
  ? ['/static/js/bundle.js']
  : [`/${assetManifest['main.js']}`]
const webpackRuntimeInlineScript = DEV
  ? [] // in DEV runtime script in bundle
  : [process.env.REACT_APP_RUNTIME_INLINE_SCRIPT || '']
const css = DEV
  ? [] // in DEV the css is hot loaded
  : (assetManifest['main.css'] ? `/${assetManifest['main.css']}` : [])
const cssHashRaw = DEV && !isLoadable
  ? []
  : flushChunks(webpackStats, { rootDir: '/' }).cssHashRaw // get all css chunk paths

export default (appHTML, helmet, state, jsBundles, cssBundles, htmlClass, elasticAdaptive) => {
  const cssHash = isLoadable
    ? Object.entries(cssHashRaw).reduce((obj, [key, value]) => {
      if (!cssBundles.includes(value) && !css.includes(value)) {
        obj[key] = value
      }
      return obj
    }, {})
    : {}
  return template({
    appHTML,
    htmlClass: `class="${htmlClass}"`,
    helmet: {
      htmlAttributes: helmet.htmlAttributes.toString(),
      title: helmet.title.toString(),
      link: helmet.link.toString(),
      bodyAttributes: helmet.bodyAttributes.toString()
    },
    initialState: JSON.stringify(JSON.decycle(state)).replace(/</g, '\\\x3c'),
    scripts: [
      ...jsBundles,
      ...bundle
    ],
    inlineScripts: [
      ...webpackRuntimeInlineScript
    ],
    styles: [
      ...css,
      ...cssBundles
    ],
    stylesHash: JSON.stringify(cssHash),
    elasticAdaptive,
    production: !DEV
  })
}
