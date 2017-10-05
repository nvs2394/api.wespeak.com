'use strict'

const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')
const User = mongoose.model('User')

const validateJwt = (request, decodedToken, callback) => {
  const error = ''
  User.findById(decodedToken._doc._id)
    .then((user) => {
      if (user) {
        const credentials = {
          email: user.email,
          userId: user._id,
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

const genToken = (data) => {
  console.log(data)
  const weSpeakToken = jwt.sign(data, config.get('app.jwtSecret'), {algorithm: 'HS256'})
  return weSpeakToken
}

module.exports = {
  validateJwt,
  genToken
}
