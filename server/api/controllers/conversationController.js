'use strict'
const _ = require('lodash')
const mongoose = require('mongoose')
const Conversation = mongoose.model('conversation')
const Constant = require('../../utils/constant')
const matchingController = require('./matchingController')

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
 * @param {*} filter
 */
const getConversationByFilter = ({userId, ...filter}) => {
  const selectField = ['name', 'avatarUrl', 'nativeLanguage']
  try {
    const conversations = Conversation
      .find({$or: [{userId: userId}, {partnerId: userId}], ...filter})
      .populate({path: 'userId', select: selectField})
      .populate({path: 'partnerId', select: selectField})
      .select('-conversationOnFirebaseId -partnerOTToken -userOTToken -sessionId')
    return conversations
  } catch (error) {
    throw new Error(error)
  }
}

const findConversation = (userId, listUser) => {
  let foundConversation = null
  for (let i = 0; i < Constant.FIND_TIMMER; i++) {
    const matching = matchingController.matchConversation(userId, listUser)
    if (matching) {
      foundConversation = matching
      const conversationsDetail = matchingController.assignMatching(userId, foundConversation)
      return conversationsDetail
    }
    if (i === Constant.FIND_TIMMER - 1) {
      return foundConversation
    }
  }
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
  saveConversationToLocalDB,
  changeStatusConversation,
  updateConversationToLocalDB,
  getConversationById,
  getConversationByFilter,
  findConversation
}
