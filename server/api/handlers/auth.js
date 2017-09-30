const mongoose = require('mongoose')
const User = mongoose.model('User')

const createNewUser = () => {
  const newUser = new User({
    name: 'Son'
  })

  newUser.save()
}

createNewUser()

module.exports = {
  createNewUser
}
