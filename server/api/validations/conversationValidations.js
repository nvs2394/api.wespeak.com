'use strict'
const joi = require('joi')

const conversationValidations = {

  /**
   *GET /getUserByUserId
   */
  findConversation: {
    headers: {},
    options: {
      allowUnknown: true
    }
  },
  /**
   *GET /getUserByEmail
   */
  getUserByEmail: {
    headers: {},
    query: {
      email: joi.string().trim().required().description('Email of user you want to fetch')
    },
    options: {
      allowUnknown: true
    }
  },
  /**
   *GET /updateUser
   */
  updateUserInfo: {
    headers: {},
    payload: {
      name: joi.string().trim().description('User name'),
      about: joi.string().trim().description('Something about user'),
      nativeLanguage: joi.string().trim().description('User native language')
    },
    options: {
      allowUnknown: true
    }
  }
}

module.exports = conversationValidations
