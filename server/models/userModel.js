const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String
})

const user = mongoose.model('User', UserSchema)
module.exports = {
  User: user
}
