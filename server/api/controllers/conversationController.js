'use strict'
const mongoose = require('mongoose')
const Conversation = mongoose.model('conversation')
const _ = require('lodash')

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
  console.log('callerId', callerId)
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

}

const updateConversationOnFirebase = () => {

}

/**
 * 
 * @param {*} conversationFirebaseId 
 */
const removeConversationOnFirebase = (conversationFirebaseId) => {

}

module.exports = {
  matchConversation,
  saveConversationToLocalDB,
  removeConversationOnFirebase,
  updateConversationOnFirebase
}
