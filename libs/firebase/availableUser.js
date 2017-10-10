const firebase = require('./connection')

const ref = firebase.database().ref()
const availableUserRef = ref.child('available_user')

const getListAvailableUser = () => {
  return new Promise((resolve, reject) => {
    let listUser = []
    availableUserRef.on('child_added', (snapshot) => {
      listUser.push(snapshot.val())
      return resolve(listUser)
    })
  })
}

/**
 * 
 * @param {*} userId 
 */
const addUserToAvailableUser = (userId) => {
  return new Promise((resolve, reject) => {
    availableUserRef.push({ user_id: userId.toString() }).then(resolve, reject)
  })
}

module.exports = {
  getListAvailableUser,
  addUserToAvailableUser
}
