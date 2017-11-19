const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Constant = require('../utils/constant')

const listOfStatus = ['AVAILABLE', 'CONNECTING', 'CALLING', 'UNAVAILABLE']
/**
 * User model || User information
 */

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
    default: Constant.USER_STATUS.AVAILABLE
  },
  scope: [String]
}, {
  timestamps: true
})

const user = mongoose.model('User', UserSchema)
module.exports = {
  User: user
}
