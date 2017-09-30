'use strict'

const joi = require('joi')

const userValidations = {

  /**
   *GET /getUserByUserId
   */
  getUserByUserId: {
    headers: {},
    query: {
      id: joi.string().trim().required().description('Id of user you want to fetch')
    },
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
  }
}

module.exports = userValidations
