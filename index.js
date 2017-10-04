'use strict'

// require new relic at the top only in production environment
if (process.env.NODE_ENV === 'production') {
  require('newrelic')
}

const config = require('config')
const mongoose = require('mongoose')

const server = require('./server')
const logger = require('./server/utils/logger')
const dbUser = `${config.get('db.username')}:${config.get('db.password')}@`
const dbConnection = 'mongodb://' + `${dbUser}` + `${config.get('db.host')}:` + `${config.get('db.port')}` + '/' + `${config.get('db.name')}`
console.log(dbConnection)

const gracefulStopServer = function () {
  // Wait 10 secs for existing connection to close and then exit.
  server.stop({timeout: 10 * 1000}, () => {
    logger.info('Shutting down server')
    process.exit(0)
  })
}

process.on('uncaughtException', err => {
  logger.error(err, 'Uncaught exception')
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  logger.error({
    promise: promise,
    reason: reason
  }, 'unhandledRejection')
  process.exit(1)
})

process.on('SIGINT', gracefulStopServer)
process.on('SIGTERM', gracefulStopServer)

/**
 * Starts the server
 * @returns {Promise.<void>}
 */
const startServer = async function () {
  try {
    // add things here before the app starts, like database connection check etc
    await server.start()
    logger.info(`server started at port: ${config.get('app.port')} with env: ${config.util.getEnv('NODE_ENV')}`)
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

/**
 *Connect MongoDB with mongoose
 */
mongoose.connect(dbConnection, {
  useMongoClient: true,
  promiseLibrary: global.Promise,
  uri_decode_auth: true
})

mongoose.connection.on('connected', () => {
  const message = '** Success to connect to database **'
  console.log(message)
  startServer()
})

mongoose.connection.on('error', () => {
  const message = '** Failed to connect to database. **'
  console.log(message)
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})
