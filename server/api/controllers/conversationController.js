'use strict'
const mongoose = require('mongoose')
const Conversation = mongoose.model('conversation')
const _ = require('lodash')

/**
 * 
 * @param {*} userId 
 */
const getConversationByUserId = (userId) => {
  try {
    const conversations = Conversation.find({$or: [{userId: userId}, {partnerId: userId}]})
    return conversations
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * 
 * @param {*} userId 
 * @param {*} listUser 
 */
const matchConversation = (userId, listUser) => {
  const conversation = {
    caller: userId,
    partner: _.sample(listUser).user_id
  }
  return conversation
}

/**
 * 
 * @param {*} callerId 
 * @param {*} partnerId 
 */
const saveConversationToLocalDB = async (callerId, partnerId, conversationOnFirebaseId) => {
  const newConversation = new Conversation({
    userId: callerId,
    partnerId: partnerId,
    conversationOnFirebaseId: conversationOnFirebaseId
  })

  try {
    const conversation = newConversation.save()
    return conversation
  } catch (error) {
    throw Error(error)
  }
}

const updateConversationToLocalDB = (conversationId, data) => {
  const { sessionId, userOTToken, partnerOTToken, status } = data
  try {
    const conversationUpdate = Conversation.findByIdAndUpdate(conversationId, {
      $set: {
        sessionId,
        userOTToken,
        partnerOTToken,
        status
      }
    }, { new: true }).exec()
    return conversationUpdate
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * 
 * @param {*} conversationFirebaseId 
 */
const changeStatusConversation = (conversationId, status) => {
  try {
    const statusUpdate = Conversation.findByIdAndUpdate(conversationId, {
      $set: {
        status
      }
    }, { new: true }).exec()
    return statusUpdate
  } catch (error) {
    throw new Error(error)
  }
}

const getConversationById = (conversationId) => {
  try {
    const selectField = ['name', 'avatarUrl', 'nativeLanguage']
    const conversation = Conversation.findById(conversationId)
      .populate({path: 'userId', select: selectField})
      .populate({path: 'partnerId', select: selectField})
      .select('userId partnerId status')
    return conversation
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getConversationByUserId,
  matchConversation,
  saveConversationToLocalDB,
  changeStatusConversation,
  updateConversationToLocalDB,
  getConversationById
}
