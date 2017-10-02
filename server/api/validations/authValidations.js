'use strict'

const joi = require('joi')

const authValidations = {
  /**
   *POST /logIn
   */
  logIn: {
    headers: {},
    options: {
      allowUnknown: true
    },
    query: {
      accessToken: joi.string().required().description('Facebook access token')
    }
  }
}

module.exports = authValidations
