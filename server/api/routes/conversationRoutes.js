'use strict'
const Config = require('config')
const { conversationValidations } = require('../validations')
const conversationHandler = require('../handlers/conversation')
const API_PATH = Config.get('app.apiRoot')

const routes = []

/**
 *POST /findConversation
 */
routes.push({
  path: API_PATH + '/conversation/find',
  method: 'POST',
  handler: conversationHandler.findConversation,
  config: {
    tags: ['api', 'Conversation'],
    validate: conversationValidations.findConversation,
    auth: {
      strategy: 'jwt'
    }
  }
})

/**
 *POST /makeConversation
 */
routes.push({
  path: API_PATH + '/conversation',
  method: 'POST',
  handler: conversationHandler.makeConversation,
  config: {
    tags: ['api', 'Conversation'],
    validate: conversationValidations.makeConversation,
    auth: {
      strategy: 'jwt'
    }
  }
})

/**
 *POST /stopConversation
 */
routes.push({
  path: API_PATH + '/conversation/{conversationId}/stop',
  method: 'PUT',
  handler: conversationHandler.stopConversation,
  config: {
    tags: ['api', 'Conversation'],
    validate: conversationValidations.stopConversation,
    auth: {
      strategy: 'jwt'
    }
  }
})

/**
 *POST /ratingConversation
 */
routes.push({
  path: API_PATH + '/conversation/{conversationId}/rating',
  method: 'PUT',
  handler: conversationHandler.reviewConversation,
  config: {
    tags: ['api', 'Conversation'],
    validate: conversationValidations.ratingConversation,
    auth: {
      strategy: 'jwt'
    }
  }
})

module.exports = routes
