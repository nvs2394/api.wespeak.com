const {reponseHelper: {responseError}} = require('../../helpers')
const code = require('../../utils/code')
const message = require('../../utils/message')
const { fbLoginCtrl } = require('../controllers/authController')
const { getUserByEmail, createNewUser } = require('../controllers/userController')
const { genToken } = require('../../../libs/wespeakJwt')

const firebase = require('../../../libs/firebase')
// const conversationCtrl = require('../controllers/conversationController')

/**
 * 
 * @param {*} request 
 * @param {*} reply 
 */
const facebookSignin = async (request, reply) => {
  const accessToken = request.query.accessToken
  try {
    const userInfo = await fbLoginCtrl(accessToken)
    if (userInfo) {
      try {
        const userExist = await getUserByEmail(userInfo.email)

        if (userExist) {
          const userId = userExist._id
          const availableUser = firebase.availableUser.addUserToAvailableUser(userId.toString())
          if (availableUser) {
            return reply({
              access_token: genToken(userExist)
            })
          }
          return reply(responseError(code.CAN_NOT_LOGIN, message.CAN_NOT_LOGIN, true))
        }
        try {
          const newUser = await createNewUser(userInfo)
          if (newUser) {
            const availableUser = firebase.availableUser.addUserToAvailableUser(newUser._id.toString())
            if (availableUser) {
              return reply({
                access_token: genToken(userExist)
              })
            }
            return reply(responseError(code.CAN_NOT_LOGIN, message.CAN_NOT_LOGIN, true))
          }
          return reply(responseError(code.CAN_NOT_LOGIN, message.CAN_NOT_LOGIN, true))
        } catch (error) {
          return reply(responseError(code.CAN_NOT_LOGIN, message.CAN_NOT_LOGIN, error.message))
        }
      } catch (error) {
        return reply(responseError(code.CAN_NOT_LOGIN, message.CAN_NOT_LOGIN, error.message))
      }
    }

  } catch (error) {
    return reply(responseError(code.CAN_NOT_LOGIN, message.CAN_NOT_LOGIN, true))
  }
}

module.exports = {
  facebookSignin
}
