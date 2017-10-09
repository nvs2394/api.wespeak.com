'use strict'
const Config = require('config')
const { userValidations } = require('../validations')
const userHandler = require('../handlers/user')

const API_PATH = Config.get('app.apiRoot')

const routes = []

/**
 *GET /getUserByUserId
 */
routes.push({
  path: API_PATH + '/user/{id}',
  method: 'GET',
  handler: userHandler.getUserByUserId,
  config: {
    tags: ['api', 'USER'],
    validate: userValidations.getUserByUserId,
    auth: {
      strategy: 'jwt'
    }
  }
})

/**
 *GET /user/:email
 */
routes.push({
  path: API_PATH + '/user',
  method: 'GET',
  handler: userHandler.getUserByEmail,
  config: {
    tags: ['api', 'USER'],
    auth: {
      strategy: 'jwt'
    },
    validate: userValidations.getUserByEmail
  }
})

/**
 *PUSH /user/profile
 */
routes.push({
  path: API_PATH + '/user/profile',
  method: 'GET',
  handler: userHandler.getProfileByUserId,
  config: {
    tags: ['api', 'USER'],
    auth: {
      strategy: 'jwt'
    }
  }
})

/**
 *PUT /user
 */
routes.push({
  path: API_PATH + '/user',
  method: 'PUT',
  handler: userHandler.updateUser,
  config: {
    tags: ['api', 'USER'],
    auth: {
      strategy: 'jwt'
    },
    validate: userValidations.updateUserInfo
  }
})

/**
 *PUT /user/:id/status
 */
routes.push({
  path: API_PATH + '/user/{id}/status',
  method: 'PUT',
  handler: userHandler.updateUser,
  config: {
    tags: ['api', 'USER'],
    auth: {
      strategy: 'jwt'
    },
    validate: userValidations.updateUserInfo
  }
})

module.exports = routes
