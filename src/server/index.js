import express from 'express'
import path from 'path'
import proxy from 'http-proxy-middleware'

import reactApp from './app'
import Loadable from 'react-loadable'
import { mocks } from 'mock-browser'
import cookiesMiddleware from 'universal-cookie-express'

// set global mocks for some npm components, which uses DOM. enable others if needed
const mockBrowser = new mocks.MockBrowser()
Object.assign(global, {
  document: mockBrowser.getDocument()
  // window: mockBrowser.getWindow(),
  // location: mockBrowser.getLocation(),
  // navigator: mockBrowser.getNavigator(),
  // requestAnimationFrame: () => {} // for react checks
})

const host = process.env.REACT_APP_HOST || 'localhost'
const serverPort = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_SERVER_PORT
  : process.env.REACT_APP_PORT || 8080

const app = express()
if (process.env.NODE_ENV === 'production') {
// In production we want to serve our JavaScripts from a file on the file
// system.
  app.use('/static', express.static(path.join(__dirname, '../client/static'), { index: false }))
} else {
  // Otherwise we want to proxy the webpack development server.
  app.use(['/static', '/sockjs-node'], proxy({
    target: `http://localhost:${process.env.REACT_APP_CLIENT_PORT}`,
    ws: true,
    logLevel: 'error'
  }))
}

app.use('/', express.static(path.join(__dirname, '../client'), { index: false }))

app.use(cookiesMiddleware())

app.use(reactApp)

// preload all Loadable chunks before start
Loadable.preloadAll().then(() => {
  app.listen(serverPort, host, () => {
    console.log(`Listening at http://${host}:${serverPort}`)
  })
})
