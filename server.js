'use strict'

const Hapi = require('hapi')
const config = require('config')
const hapiJwt = require('hapi-auth-jwt')

const routes = require('./routes')
const plugins = require('./plugins')
const logger = require('./server/utils/logger')
const {validateJwt} = require('./libs/wespeakJwt')

const server = new Hapi.Server()

server.connection({
  port: config.get('app.port')
})

// register plugins
const registerPlugins = async () => {
  try {
    await server.register(plugins)
  } catch (error) {
    logger.error(error, 'Failed to register hapi plugins')
    throw error
  }
}

server.register(hapiJwt, () => {
  server.auth.strategy('jwt', 'jwt', {
    key: config.get('app.jwtSecret'),
    validateFunc: validateJwt,
    verifyOptions: { algorithms: ['HS256'] }
  })

  // attach routes here
  server.route(routes)

})

registerPlugins()

// export modules
module.exports = server
