'use strict'

const boom = require('boom')
const httpStatus = require('http-status')

const getUserByUserId = async function (req, res) {
  const userId = req.query.user_id
  return res(boom.boomify(userId, { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: 'errorMessage' }))
}

const getUserByEmail = async function (req, res) {
  return res(boom.boomify('error', { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: 'errorMessage' }))
}

module.exports = {
  getUserByUserId,
  getUserByEmail
}
