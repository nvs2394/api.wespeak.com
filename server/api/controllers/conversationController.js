'use strict'
const _ = require('lodash')

/**
 * findConversation
 */
const findConversation = () => {
  return true
}

/**
 * 
 * @param {*} userId 
 * @param {*} listUser 
 */
const matchConversation = (userId, listUser) => {
  const conversation = {
    caller: userId,
    partner: _.sample(listUser)
  }
  return conversation
}

/**
 * 
 * @param {*} callerId 
 * @param {*} partnerId 
 */
const saveConversationToLocalDB = (callerId, partnerId) => {

}

/**
 * 
 * @param {*} callerId 
 * @param {*} partnerId 
 */
const saveConversationToFirebase = (callerId, partnerId) => {

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
  findConversation,
  saveConversationToFirebase,
  matchConversation,
  saveConversationToLocalDB,
  removeConversationOnFirebase,
  updateConversationOnFirebase
}
