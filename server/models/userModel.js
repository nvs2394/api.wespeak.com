const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listOfStatus = ['ONLINE', 'OFF_ONLINE', 'UNKNOW']

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
  about: {
    type: String,
    default: ''
  },
  nativeLanguage: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: listOfStatus,
    default: 'UNKNOW'
  },
  scope: [String]
})

const user = mongoose.model('User', UserSchema)
module.exports = {
  User: user
}
