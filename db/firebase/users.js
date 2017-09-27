var firebase = require('./connection')();

function getUsers() {
  return new Promise((resolve, reject) => {
    firebase.database().ref('/users').once('value').then((snapShot) => {
      return resolve(snapShot);
    }, (error) => {
      return reject(error);
    });
  });
}

module.exports = {
  getUsers: getUsers
}
