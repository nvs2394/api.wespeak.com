'use strict'
const mongoose = require('mongoose')
const User = mongoose.model('User')

const getUserByUserId = async (id) => {
  try {
    const user = User.findById(id).select('-isDelete -__v')
    return user
  } catch (error) {
    throw new Error(error)
  }
}

const createNewUser = async function (user) {
  const newUser = new User({
    email: user.email,
    name: user.name,
    avatarUrl: user.picture.data.url,
    scope: ['USER']
  })
  try {
    const userSaved = await newUser.save()
    return userSaved
  } catch (error) {
    throw Error(error)
  }
}

const deleteUser = async function (id) {
  User.findByIdAndRemove(id)
    .then((isDelete) => {
      return 'isDelete'
    })
}

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({email})
    return user
  } catch (error) {
    throw new Error(error)
  }
}

const updateUserByUserId = async (userId, data) => {
  const {about, name, nativeLanguage} = data
  try {
    const userUpdate = await User.findByIdAndUpdate(userId, {
      $set: {
        about,
        name,
        nativeLanguage
      }
    }, { new: true, select: '-isDelete -__v' }).exec()

    return userUpdate
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getUserByUserId,
  createNewUser,
  deleteUser,
  getUserByEmail,
  updateUserByUserId
}
