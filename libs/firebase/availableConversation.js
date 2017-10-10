const firebase = require('./connection')

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
  return new Promise((resolve, reject) => {
    availableConversationRef.push({
      user_id: userId.toString(),
      partner_id: partnerId.toString(),
      status: 'CALLING'
    }).then(resolve, reject)
  })
}

module.exports = {
  getListAvailableConversation,
  addUserToAvailableConversation
}
