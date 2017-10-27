'use strict'

const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')
const User = mongoose.model('User')

/**
 * 
 * @param {*} request 
 * @param {*} decodedToken 
 * @param {*} callback 
 */
const validateJwt = async (request, decodedToken, callback) => {
  const error = ''
  User.findById(decodedToken.id)
    .then((user) => {
      if (user) {
        const credentials = {
          email: user.email,
          userId: user.id,
          name: user.name,
          status: user.status,
          avatarUrl: user.avatarUrl
        }
        return callback(null, true, credentials)
      }

      return callback(null, false)
    })
    .then(() => {
      return callback(error, true, {})
    })
}

/**
 * 
 * @param {*} data 
 */
const genToken = (data) => {
  const weSpeakToken = jwt.sign(data, config.get('app.jwtSecret'), {algorithm: 'HS256'})
  return weSpeakToken
}

module.exports = {
  validateJwt,
  genToken
}
