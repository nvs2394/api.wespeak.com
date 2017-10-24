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
 *POST /sessionId
 */
routes.push({
  path: API_PATH + '/conversation/session',
  method: 'POST',
  handler: conversationHandler.generateSession,
  config: {
    tags: ['api', 'Conversation'],
    auth: {
      strategy: 'jwt'
    }
  }
})

/**
 *POST /tokenId
 */
routes.push({
  path: API_PATH + '/conversation/token',
  method: 'POST',
  handler: conversationHandler.generateToken,
  config: {
    tags: ['api', 'Conversation'],
    validate: conversationValidations.getTokenId,
    auth: {
      strategy: 'jwt'
    }
  }
})

module.exports = routes
