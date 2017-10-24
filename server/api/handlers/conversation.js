'use strict'

const httpStatus = require('http-status')
const { responseError } = require('../../helpers/reponseHelper')
const firebase = require('../../../libs/firebase')
const { openTokManagement } = require('../../../libs/opentok/index')
const _ = require('lodash')
const conversationCtrl = require('../controllers/conversationController')

/**
 * 
 * @param {*} req 
 * @param {*} reply 
 */

const findConversation = async (req, reply) => {
  const { userId } = req.auth.credentials
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
        const availableConversation = await firebase.availableConversation
          .addUserToAvailableConversation(matchConversation.caller, matchConversation.partner)
        if (availableConversation) {
          /**
           * Save to Conversation Model
           */
          const newConversation = await conversationCtrl
            .saveConversationToLocalDB(matchConversation.caller, matchConversation.partner)
          if (newConversation) {
            /**
             * GET Conversation detail
             */
            const conversationDetail = await conversationCtrl.getConversationById(newConversation._id)
            return reply(conversationDetail)
          }
        }
        return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500], true))
      }
    }
  } catch (error) {
    return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, error, httpStatus[500]))
  }
}

const makeConversation = async (req, reply) => {
  const conversationId = req.payload.conversationId
  /**
   * Create session
   */
  const session = await openTokManagement.creatingSession()
  /**
   * Generate tokenId from sessionId for Caller & Partner
   */
  const tokenCaller = await openTokManagement.generatingToken(session.sessionId)
  const tokenPartner = await openTokManagement.generatingToken(session.sessionId)
  /**
   * Save to Firebase &  change status to CALLING
   */

  /**
   * Save to LocalDB &  change status to CALLING
   */
  return reply({
    tokenCaller: tokenCaller.token,
    tokenPartner: tokenPartner.token,
    sessionId: session.sessionId
  })
}

const generateSession = async (req, reply) => {
  try {
    const session = await openTokManagement.creatingSession()
    return reply({
      sessionId: session.sessionId
    })
  } catch (error) {
    return reply({
      err: new Error(error.message)
    })
  }
}

const generateToken = async (req, reply) => {
  try {
    const sessionId = req.payload.sessionId
    const token = await openTokManagement.generatingToken(sessionId)
    return reply(token)
  } catch (error) {
    return reply({
      err: new Error(error.message)
    })
  }
}

module.exports = {
  findConversation,
  generateSession,
  generateToken,
  makeConversation
}
