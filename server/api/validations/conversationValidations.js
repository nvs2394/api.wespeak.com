'use strict'
const joi = require('joi')

const conversationValidations = {

  /**
   *POST /findConversation
   */
  findConversation: {
    headers: {},
    options: {
      allowUnknown: true
    }
  },
  /**
   *POST /makeConversation
   */
  makeConversation: {
    headers: {},
    payload: {
      conversationId: joi.string().trim().description('Conversation Id')
    },
    options: {
      allowUnknown: true
    }
  },
  /**
   *GET /updateUser
   */
  getTokenId: {
    headers: {},
    payload: {
      sessionId: joi.string().trim().description('Session of OpenTok')
    },
    options: {
      allowUnknown: true
    }
  }
}

module.exports = conversationValidations
