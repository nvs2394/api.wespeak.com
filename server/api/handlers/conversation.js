'use strict'

const httpStatus = require('http-status')
const userController = require('../controllers/userController')
const { responseSuccess, responseError } = require('../../helpers/reponseHelper')
const code = require('../../utils/code')
const message = require('../../utils/message')
const firebase = require('../../../libs/firebase')
const _ = require('lodash')

const findConversation = async (req, reply) => {
  const { userId } = req.auth.credentials
  /**
   * Add user_id to AvailableUser on firebase
    */
  try {
    const userAvailable = await firebase.availableUser.getListAvailableUser(userId)
    const isAvailable = userAvailable.filter((item) => item.user_id === userId.toString())

    if (!_.isEmpty(isAvailable)) {
      return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500], true))
    } else {
      /**
       * Add User to Firebase
       */
      try {
        const newUserAvailable = await firebase.availableUser.addUserToAvailableUser(userId)
        if (newUserAvailable) {
          /**
           * Match User
           */
        }
      } catch (error) {
      }
      return reply(responseError(httpStatus.OK, httpStatus[200]))
    }

  } catch (error) {
    console.log('vl')
    return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, error, httpStatus[500], true))
  }
}

module.exports = {
  findConversation
}