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

  } catch (error) {
    return reply(responseError(code.CAN_NOT_LOGIN, message.CAN_NOT_LOGIN, true))
  }
}

module.exports = {
  facebookSignin
}
