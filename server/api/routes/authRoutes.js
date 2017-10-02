'use strict'
const Config = require('config')
const { authValidations } = require('../validations')
const authHandler = require('../handlers/auth')

const API_PATH = Config.get('app.apiRoot')

const routes = []

/**
 *GET /getUserByUserId
 */
routes.push({
  path: API_PATH + '/login',
  method: 'GET',
  handler: authHandler.facebookSignin,
  config: {
    tags: ['api', 'AUTH'],
    validate: authValidations.logIn,
    plugins: {
      'hapi-swagger': {
        produces: ['application/json', 'application/xml'],
        consumes: ['application/json', 'application/xml']
      }
    }
  }
})

module.exports = routes
