var users;
var firebase = require('../db/firebase');

users = {
  read: function read(req, res) {
    firebase.users.getUsers().then((data) => {
      res.json(data);
    }).catch((error) => {
      res.json(error);
    })
  }
}

module.exports = users;
