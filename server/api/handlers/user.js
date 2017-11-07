'use strict'

const httpStatus = require('http-status')
const _ = require('lodash')
const userController = require('../controllers/userController')
const conversationController = require('../controllers/conversationController')
const reviewController = require('../controllers/reviewController')
const { responseSuccess, responseError } = require('../../helpers/reponseHelper')
const code = require('../../utils/code')
const message = require('../../utils/message')
const caculateRating = require('../../utils/caculateRating')

const getProfileByUserId = async (req, reply) => {
  const { userId } = req.auth.credentials

  try {
    const userProfile = await userController.getUserByUserId(userId)
    if (userProfile) {
      const mapResponseProfile = {
        user: userProfile
      }
      const conversations = await conversationController.getConversationByUserId(userId)
      mapResponseProfile.totalConversation = conversations.length
      const arrayConversationId = conversations.map((item) => item._id)
      if (!arrayConversationId) {
        mapResponseProfile.rating = 1
      } else {
        const reviews = await reviewController.getReviewsByConversationId(arrayConversationId)
        if (_.isEmpty(reviews)) {
          mapResponseProfile.rating = 1
        } else {
          mapResponseProfile.rating = caculateRating.getAverage(reviews)
        }
      }
      return reply(responseSuccess(httpStatus.OK, httpStatus[200], mapResponseProfile))
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
    return reply(responseError(code.USER_NOT_FOUND, message.USER_NOT_FOUND, true))
  } catch (error) {
    return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500], error.message))
  }
}

const getUserByEmail = async function (req, reply) {
  const email = req.query.email

  try {
    const user = await userController.getUserByEmail(email)
    if (user) {
      return reply(responseSuccess(httpStatus.OK, httpStatus[200], user))
    }
    return reply(responseError(code.USER_NOT_FOUND, message.USER_NOT_FOUND, true))
  } catch (error) {
    return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500], error.message))
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
    return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, error, httpStatus[500], error.message))
  }
}

module.exports = {
  getUserByUserId,
  getUserByEmail,
  getProfileByUserId,
  updateUser
}
