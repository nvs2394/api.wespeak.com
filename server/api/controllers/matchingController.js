'use strict'
const _ = require('lodash')

const conversationCtrl = require('./conversationController')
const Constant = require('../../utils/constant')
const firebase = require('../../../libs/firebase')

const assignMatching = async (userId, matchConversation) => {
  console.log('matchConversation', matchConversation)
  const conversationOnFirebaseId = await firebase.availableConversation
    .addUserToAvailableConversation(matchConversation.caller, matchConversation.partner)
  if (conversationOnFirebaseId) {
    /**
     * Add conversation to available_user
     */
    const userWithConverastionId = firebase.availableUser.updateAvailableUser(userId, {
      isFind: false,
      status: Constant.USER_STATUS.CONNECTING,
      user_id: userId.toString(),
      conversation: { id: conversationOnFirebaseId, status: Constant.CONVERSATION_STATUS.WAITING }
    })
    /**
     * Save to Conversation Model
     */
    const newConversation = await conversationCtrl
      .saveConversationToLocalDB(matchConversation.caller, matchConversation.partner, conversationOnFirebaseId)
      console.log('newConversation', newConversation)
    if (newConversation && userWithConverastionId) {
      /**
       * GET Conversation detail
       */
      const conversationDetail = await conversationCtrl.getConversationById(newConversation._id)
      if (conversationDetail) {
        return conversationDetail
      }
      return null
    }
  }
}

/**
 * 
 * @param {*} userId 
 * @param {*} listUser 
 */
const matchConversation = (userId, listUser) => {
  const newList = _.filter(listUser, (user) => user.user_id === userId)

  if (_.isEmpty(newList)) {
    return null
  }
  const isFindList = newList.filter((user) => user.isFind === true)
  const normalList = newList.filter((user) => user.isFind !== true)
  let conversation = {
    caller: userId
  }
  if (!isFindList) {
    conversation.partner = _.sample(normalList).user_id
  }
  conversation.partner = _.sample(isFindList).user_id
  return conversation
}

module.exports = {
  assignMatching,
  matchConversation
}
