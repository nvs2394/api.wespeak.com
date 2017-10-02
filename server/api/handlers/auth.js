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
          token: genToken(userExist)
        })
      }
      const newUser = await createNewUser(userInfo)
      if (newUser) {
        return reply({
          token: genToken(userExist)
        })
      }
      return reply({
        error: 'Something went wrong'
      })
    }

  } catch (error) {
    return reply(
      error
    )
  }
}

module.exports = {
  facebookSignin
}
