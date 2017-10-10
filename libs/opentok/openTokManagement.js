'use strict'
const opentok = require('./connection')

const creatingSession = () => {
  return new Promise((resolve, reject) => {
    opentok.createSession()
      .then((session) => {
        return {
          sessionId: session.sessionId
        }
      })
      .then((err) => {
        throw new Error(err)
      })
  })
}

const generatingToken = (sessionId) => {
  try {
    const token = opentok.generateToken(sessionId)
    return {
      token
    }
  } catch (error) {
    throw new Error(error)
  }

}

module.exports = {
  creatingSession,
  generatingToken
}
