'use strict'

const httpStatus = require('http-status')
const { responseError } = require('../../helpers/reponseHelper')
const firebase = require('../../../libs/firebase')
const _ = require('lodash')
const conversationCtrl = require('../controllers/conversationController')

/**
 * 
 * @param {*} req 
 * @param {*} reply 
 */

const findConversation = async (req, reply) => {
  const { userId } = req.auth.credentials
  /**
   * Add user_id to AvailableUser on firebase
    */
  try {
    const userAvailables = await firebase.availableUser.getListAvailableUser()
    const isAvailable = userAvailables.filter((item) => item.user_id === userId.toString())

    if (_.isEmpty(isAvailable) && _.isEmpty(userAvailables)) {
      return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500], true))
    } else {
      /**
       * Match User 
       */
      const matchConversation = await conversationCtrl.matchConversation(userId, userAvailables)
      if (matchConversation) {
        const availableConversation = firebase.availableConversation
          .addUserToAvailableConversation(matchConversation.caller, matchConversation.partner)
        if (availableConversation) {
          return reply(matchConversation)
        }
        return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500], true))
      }
    }
  } catch (error) {
    return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, error, httpStatus[500]))
  }
}

module.exports = {
  findConversation
}
