'use strict'
const { createNewUser } = require('../handlers/auth.js')

const logIn = async function (user) {
  return createNewUser()
}

const signUp = async function (user) {
  return 'signUp'
}

module.exports = {
  logIn,
  signUp
}
