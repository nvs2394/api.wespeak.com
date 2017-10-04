const { responseError } = require('../../helpers')
const code = require('../../utils/code')
const message = require('../../utils/message')

const { fbLoginCtrl } = require('../controllers/authController')
const { getUserByEmail, createNewUser } = require('../controllers/userController')
const { genToken } = require('../../../libs/wespeakJwt')

const facebookSignin = async (request, reply) => {
  const accessToken = request.query.accessToken
  try {
    const userInfo = await fbLoginCtrl(accessToken)
    if (userInfo) {
      const userExist = await getUserByEmail(userInfo.email)
      if (userExist) {
        return reply({
          access_token: genToken(userExist)
        })
      }
      const newUser = await createNewUser(userInfo)
      if (newUser) {
        return reply({
          access_token: genToken(userExist)
        })
      }
      return reply(responseError(code.CAN_NOT_LOGIN, message.CAN_NOT_LOGIN, true))
    }

  } catch (error) {
    return reply(responseError(code.CAN_NOT_LOGIN, message.CAN_NOT_LOGIN, true))
  }
}

module.exports = {
  facebookSignin
}
