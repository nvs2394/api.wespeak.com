'use strict'
const firebase = require('./connection')
const Constant = require('../../server/utils/constant')

const ref = firebase.database().ref()
const availableConversationRef = ref.child('available_conversation')

const getListAvailableConversation = () => {
  return new Promise((resolve, reject) => {
    let listConversation = []
    availableConversationRef.on('child_added', (snapshot) => {
      listConversation.push(snapshot.val())
      return resolve(listConversation)
    })
  })
}

/**
 * 
 * @param {*} userId 
 */
const addUserToAvailableConversation = (userId, partnerId) => {
  const conversationKey = ref.child('available_conversation').push().key
  const availableConversationRef = ref.child('available_conversation/' + `${conversationKey}`)

  const data = {
    user_id: userId,
    partner_id: partnerId,
    status: Constant.CONVERSATION_STATUS.WAITING
  }

  return new Promise((resolve, reject) => {
    try {
      availableConversationRef.set(data).then(() => {
        return resolve(conversationKey)
      })
    } catch (error) {
      return reject(error)
    }
  })
}

/**
 * 
 * @param {*} conversationFBId 
 * @param {*} data 
 */
const updateAvailableConversation = (conversationFBId, data) => {
  const conversationKey = 'available_conversation/' + `${conversationFBId}`
  const availableConversationRef = ref.child(conversationKey)

  return new Promise((resolve, reject) => {
    availableConversationRef.set(data).then(resolve, reject)
  })
}

module.exports = {
  getListAvailableConversation,
  addUserToAvailableConversation,
  updateAvailableConversation
}
