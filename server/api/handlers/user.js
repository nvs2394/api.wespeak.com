'use strict'

const httpStatus = require('http-status')
const userController = require('../controllers/userController')
const { responseSuccess, responseError } = require('../../helpers/reponseHelper')

const getProfileByUserId = async (req, reply) => {
  const { userId } = req.auth.credentials

  try {
    const userProfile = await userController.getUserByUserId(userId)
    if (userProfile) {
      return reply(responseSuccess(httpStatus.OK, httpStatus[200], userProfile))
    }
  } catch (error) {
    return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, error, httpStatus[500], true))
  }
}

const getUserByUserId = async (req, reply) => {
  const userId = req.params.id

  try {
    const user = await userController.getUserByUserId(userId)
    if (user) {
      return reply(responseSuccess(httpStatus.OK, httpStatus[200], user))
    }
  } catch (error) {
    return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, error, httpStatus[500], true))
  }
}

const getUserByEmail = async function (req, reply) {
  const email = req.query.email

  try {
    const user = await userController.getUserByEmail(email)
    if (user) {
      return reply(responseSuccess(httpStatus.OK, httpStatus[200], user))
    }
  } catch (error) {
    return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, error, httpStatus[500], true))
  }
}

const updateUser = async function (req, reply) {
  const { userId } = req.auth.credentials
  const data = req.payload

  try {
    const user = await userController.updateUserByUserId(userId, data)
    if (user) {
      return reply(responseSuccess(httpStatus.OK, httpStatus[200], user))
    }
  } catch (error) {
    return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, error, httpStatus[500], true))
  }
}

module.exports = {
  getUserByUserId,
  getUserByEmail,
  getProfileByUserId,
  updateUser
}
