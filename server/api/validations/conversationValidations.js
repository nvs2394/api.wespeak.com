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
   *POST /stopConversation
   */
  stopConversation: {
    headers: {},
    params: {
      conversationId: joi.string().trim().required().description('Id of Conversation you want to change status to DONE')
    },
    payload: {
      status: joi.string().trim().description('status = DONE')
    },
    options: {
      allowUnknown: true
    }
  }
}

module.exports = conversationValidations
