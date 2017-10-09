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
  path: API_PATH + '/conversation',
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

module.exports = routes
