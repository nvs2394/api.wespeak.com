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
  },
  /**
   *POST /ratingConversation
   */
  ratingConversation: {
    headers: {},
    params: {
      conversationId: joi.string().trim().required().description('Id of Conversation you want to change status to DONE')
    },
    payload: {
      partnerStar: joi.number().min(1).max(5).description('Review partner can be from 1 to 5'),
      qualityStar: joi.number().min(1).max(5).description('Review quality can be from 1 to 5'),
      comment: joi.string().trim().allow('').description('Comment for reivew')
    },
    options: {
      allowUnknown: true
    }
  }
}

module.exports = conversationValidations
