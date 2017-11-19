const {reponseHelper: {responseError}} = require('../../helpers')
const code = require('../../utils/code')
const message = require('../../utils/message')
const { fbLoginCtrl } = require('../controllers/authController')
const { getUserByEmail, createNewUser, updateUserByUserId } = require('../controllers/userController')
const { genToken, payloadToken } = require('../../../libs/wespeakJwt')

const firebase = require('../../../libs/firebase')

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
          /**
           * update : status = AVAILABLE
           */
          const availableUser = firebase.availableUser.updateStatusAvailableUser(userId.toString(), { status: userExist.status })
          if (availableUser) {
            let dataToken = payloadToken(userExist)
            return reply({
              access_token: genToken(dataToken)
            })
          }
          return reply(responseError(code.CAN_NOT_LOGIN, message.CAN_NOT_LOGIN, true))
        }
        try {
          const newUser = await createNewUser(userInfo)
          if (newUser) {
            const availableUserId = firebase.availableUser.addUserToAvailableUser(newUser._id.toString())
            if (availableUserId) {
              // call to update user collection with userFBId on firebase
              const updateUserFBId = await updateUserByUserId(newUser._id, { userFBId: availableUserId })
              if (updateUserFBId) {
                let dataToken = payloadToken(updateUserFBId)
                return reply({
                  access_token: genToken(dataToken)
                })
              }

              return reply(responseError(code.CAN_NOT_LOGIN, message.CAN_NOT_LOGIN, true))

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
