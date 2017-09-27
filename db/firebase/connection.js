var firebase = require('firebase-admin'),
    Promise = require('promise');

function init() {
  console.log("connection initialized");

  var serviceAccount = require('../../ws-firebase.json');

  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://we-speak.firebaseio.com"
  });
  return firebase;
}

module.exports = init;

