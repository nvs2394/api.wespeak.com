const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: true
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  desscription: {
    type: String,
    default: ''
  },
  scope: [String]
})

const user = mongoose.model('User', UserSchema)
module.exports = {
  User: user
}
