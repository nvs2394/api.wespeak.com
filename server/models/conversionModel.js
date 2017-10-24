/**
 * Conversation model || Save all data of conversation
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listOfStatus = ['DONE', 'CANCELD', 'CALLING', 'WAITING', 'UNKNOW']
const ConversationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  partnerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  sessionId: {
    type: String,
    default: ''
  },
  userOTToken: {
    type: String,
    default: ''
  },
  partnerOTToken: {
    type: String,
    default: ''
  },
  conversationOnFirebaseId: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: listOfStatus,
    default: listOfStatus[3]
  }
}, {
  timestamps: true
})

const conversation = mongoose.model('conversation', ConversationSchema)
module.exports = {
  Conversation: conversation
}
