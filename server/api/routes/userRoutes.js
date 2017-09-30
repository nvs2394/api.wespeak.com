'use strict'
const Config = require('config')
const { userValidations } = require('../validations')

const API_PATH = Config.get('app.apiRoot')

const routes = []

/**
 *GET /getUserByUserId
 */
routes.push({
  path: API_PATH + '/getAllUser',
  method: 'GET',
  handler: () => {

  },
  config: {
    tags: ['api'],
    validate: userValidations.getUserByUserId
  }
})

/**
 *GET /getUserByEmail
 */
routes.push({
  path: API_PATH + '/getUserByEmail',
  method: 'GET',
  handler: () => {

  },
  config: {
    tags: ['api'],
    validate: userValidations.getUserByEmail
  }
})

module.exports = routes
