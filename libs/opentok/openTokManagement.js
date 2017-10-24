'use strict'
const opentok = require('./connection')

const creatingSession = () => {
  console.log('creatingSession')
  return new Promise((resolve, reject) => {
    opentok.createSession((err, session) => {
      if (err) {
        return reject(err)
      }
      return resolve(session)
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
