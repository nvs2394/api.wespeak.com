const firebase = require('firebase-admin')
const config = require('config')

const init = () => {
  console.log('Firebase connection initialized')

  const serviceAccount = require('../../config/serviceAccountKey.json')

  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: config.get('fireBaseApi.projectURL')
  })
  return firebase
}

module.exports = init
