'use strict'

const boom = require('boom')
const httpStatus = require('http-status')
const userController = require('../controllers/userController')
const { responseSuccess, responseError } = require('../../helpers/reponseHelper')

const getUserByUserId = async (req, reply) => {
  const { userId } = req.auth.credentials

  try {
    const userProfile = await userController.getUserByUserId(userId)
    if (userProfile) {
      return reply(responseSuccess(httpStatus.OK, httpStatus[200], userProfile))
    }
  } catch (error) {
    return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, error, httpStatus[500]))
  }
}

const getUserByEmail = async function (req, res) {
  return res(boom.boomify('error', { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: 'errorMessage' }))
}

module.exports = {
  getUserByUserId,
  getUserByEmail
}
