'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'
process.env.REACT_APP_SSR = 'true'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

// Ensure environment variables are read.
require('../config/env')

const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const clearConsole = require('react-dev-utils/clearConsole')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const { exec } = require('child_process')
const {
  choosePort,
  prepareProxy,
  prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils')
const paths = require('../config/paths')
const createDevServerConfig = require('../config/webpackDevServer.config')

const isInteractive = process.stdout.isTTY

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appIndexJs])) {
  process.exit(1)
}

// Tools like Cloud9 rely on this.
const DEFAULT_CLIENT_PORT = parseInt(process.env.PORT, 10) || 3000
const DEFAULT_SERVER_PORT = parseInt(process.env.PORT_SERVER, 10) || 8080
const HOST = process.env.HOST || '0.0.0.0'

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  )
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  )
  console.log(`Learn more here: ${chalk.yellow('http://bit.ly/2mwWSwH')}`)
  console.log()
}

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `choosePort()` Promise resolves to the next free port.
choosePort(HOST, DEFAULT_CLIENT_PORT)
  .then(port => {
    if (port == null) {
      // We have not found a port.
      return
    }

    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
    const urls = prepareUrls(protocol, HOST, port)

    // We do this before importing the wepack.config.client.dev otherwise
    // REACT_APP_CLIENT_PORT won't be set at new webpack.DefinePlugin(env.stringified)
    process.env.REACT_APP_CLIENT_PORT = port
    const config = require('../config/webpack.config.dev')
    // hot-reloader places in "client" webpack server, so change hot loader with need url
    config.entry = [
      `webpack/hot/only-dev-server?${urls.localUrlForBrowser}`,
      `webpack-dev-server/client?${urls.localUrlForBrowser}`
    ].concat(config.entry)
    config.output.publicPath = urls.localUrlForBrowser

    // we use compiler
    const compiler = webpack(config)

    // Load proxy config
    const proxySetting = require(paths.appPackageJson).proxy
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic)
    // Serve webpack assets generated by the compiler over a web sever.
    const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig
    )
    serverConfig.port = port
    const clientServer = new WebpackDevServer(compiler, serverConfig)

    // Launch WebpackDevServer.
    clientServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err)
      }
      if (isInteractive) {
        clearConsole()
      }
      console.log(chalk.cyan(`Starting the client on port ${port}...\n`))

      choosePort(HOST, DEFAULT_SERVER_PORT)
        .then(portServer => {
          if (portServer == null) {
            // We have not found a port.
            return
          }

          process.env.REACT_APP_SERVER_PORT = portServer
          const configWebpackServer = require('../config/webpack.config.server')
          const compiler = webpack(configWebpackServer)
          // const urls = prepareUrls(protocol, HOST, portServer)
          let isServerRunning

          compiler.watch({ // watch options:
            aggregateTimeout: 300
          }, function (err, stats) {
            if (err) {
              console.log('error on webpack server', err)
            }

            if (!isServerRunning) {
              isServerRunning = true

              // При изменении кода, перезапускаем сервер, чтобы по f5 пререндерились измененные бандлы
              // hot loader при этом обновляет код в брауреле через clientDevServer
              const nodemon = exec('nodemon --watch build/server build/server/bundle.js build/server/bundle.js')

              // This is to outpout in the terminal the child process
              nodemon.stdout.on('data', function (data) {
                console.log(data.toString())
              })
              nodemon.stderr.on('data', function (data) {
                console.error(data.toString())
              })
              nodemon.on('exit', function (code) {
                console.log('nodemon process exited with code ' + code.toString())
              })

              console.log(chalk.yellow(`Starting the server on port ${portServer}...\n`))
              // setTimeout(() => { openBrowser(urls.localUrlForBrowser) }, 1000);
            }
          })
        })
        .catch(err => {
          if (err && err.message) {
            console.log(err.message)
          }
          process.exit(1)
        })
    });
    ['SIGINT', 'SIGTERM'].forEach(function (sig) {
      process.on(sig, function () {
        clientServer.close()
        process.exit()
      })
    })
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })
