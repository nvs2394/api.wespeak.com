'use strict'

const httpStatus = require('http-status')
const _ = require('lodash')
const { responseError, responseSuccess } = require('../../helpers/reponseHelper')
const firebase = require('../../../libs/firebase')
const { openTokManagement } = require('../../../libs/opentok/index')
const conversationCtrl = require('../controllers/conversationController')
const Constant = require('../../utils/constant')
const code = require('../../utils/code')
const message = require('../../utils/message')

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
        console.log('availableConversationId then')
        const conversationOnFirebaseId = await firebase.availableConversation
          .addUserToAvailableConversation(matchConversation.caller, matchConversation.partner)
        if (conversationOnFirebaseId) {
          /**
           * Save to Conversation Model
           */
          const newConversation = await conversationCtrl
            .saveConversationToLocalDB(matchConversation.caller, matchConversation.partner, conversationOnFirebaseId)
          if (newConversation) {
            /**
             * GET Conversation detail
             */
            const conversationDetail = await conversationCtrl.getConversationById(newConversation._id)
            if (conversationDetail) {
              return reply(responseSuccess(httpStatus.OK, httpStatus[200], conversationDetail))
            }
          }
        }
        return reply(responseError(code.CAN_NOT_MATCH_CONVERSATION, message.CAN_NOT_MATCH_CONVERSATION, true))
      }
    }
  } catch (error) {
    return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, error, httpStatus[500]))
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} reply 
 */
const makeConversation = async (req, reply) => {
  try {
    const conversationId = req.payload.conversationId
    const { conversationOnFirebaseId } = await conversationCtrl.getConversationById(conversationId)
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
     * Save to LocalDB &  change status to CALLING
     */
    const data = {
      sessionId: session.sessionId,
      userOTToken: tokenCaller.token,
      partnerOTToken: tokenPartner.token,
      status: Constant.CONVERSATION_STATUS.CALLING
    }
    const conversationUpdated = await conversationCtrl.updateConversationToLocalDB(conversationId, data)
    if (conversationUpdated) {
      /**
        * Save to Firebase &  change status to CALLING
        */
      const availableUpdated = firebase.availableConversation.updateAvailableConversation(conversationOnFirebaseId, data)
      if (availableUpdated) {
        return reply(responseSuccess(httpStatus.OK, httpStatus[200], conversationUpdated))
      }
      return reply(responseError(code.CAN_NOT_MAKE_CALLING, message.CAN_NOT_MAKE_CALLING, true))
    }
  } catch (error) {
    return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, error, httpStatus[500]))
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} reply 
 */
const stopConversation = async (req, reply) => {
  const conversationId = req.params.conversationId
  try {
    /**
     * Find conversation by conversationId
     */
    const { conversationOnFirebaseId } = await conversationCtrl.getConversationById(conversationId)
    /**
     * Update status on Firebase
     */
    const status = req.payload.status || Constant.CONVERSATION_STATUS.DONE
    const availableUpdated = firebase.availableConversation.updateAvailableConversation(conversationOnFirebaseId, { status: status })
    if (availableUpdated) {
      const conversationUpdated = await conversationCtrl.changeStatusConversation(conversationId, status)
      if (conversationUpdated) {
        return reply(responseSuccess(httpStatus.OK, httpStatus[200], conversationUpdated))
      }
      return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500], true))
    }
    return reply(responseError(code.CONVERSATION_NOT_FOUND, message.CAN_NOT_MAKE_CALLING, true))
  } catch (error) {
    return reply(responseError(httpStatus.INTERNAL_SERVER_ERROR, error, httpStatus[500]))
  }
}

module.exports = {
  findConversation,
  stopConversation,
  makeConversation
}
