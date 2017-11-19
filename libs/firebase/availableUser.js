const firebase = require('./connection')
const Constant = require('../../server/utils/constant')

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
  const userKey = ref.child('available_user').push().key
  const availableUserRef = ref.child('available_user/' + `${userKey}`)

  const user = {
    user_id: userId.toString(),
    status: Constant.USER_STATUS.AVAILABLE
  }
  return new Promise((resolve, reject) => {
    try {
      availableUserRef.set(user).then(() => {
        return resolve(userKey)
      })
    } catch (error) {
      return reject(error)
    }
  })
}

const updateStatusAvailableUser = (userFBId, data) => {
  const userKey = 'available_user/' + `${userFBId}`
  const availableUserRef = ref.child(userKey)

  return new Promise((resolve, reject) => {
    availableUserRef.set(data).then(resolve, reject)
  })
}

module.exports = {
  getListAvailableUser,
  addUserToAvailableUser,
  updateStatusAvailableUser
}
