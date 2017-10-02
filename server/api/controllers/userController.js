'use strict'
const mongoose = require('mongoose')
const User = mongoose.model('User')

const getUserByUserId = async (id) => {
  const user = User.findById(id).select('-isDelete -__v')
  return user
}

const createNewUser = async function (user) {
  const newUser = new User({
    email: user.email,
    name: user.name,
    avatarUrl: user.picture.data.url,
    scope: ['USER']
  })

  const userSaved = newUser.save()
  userSaved
    .then((user) => {
      return user
    })
    .then((ex) => {
      console.log(ex)
    })
}

const deleteUser = async function (id) {
  User.findByIdAndRemove(id)
    .then((isDelete) => {
      return 'isDelete'
    })
}

const getUserByEmail = async (email) => {
  const user = User.findOne({email})
  return user
}

module.exports = {
  getUserByUserId,
  createNewUser,
  deleteUser,
  getUserByEmail
}
