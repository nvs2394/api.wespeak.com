/**
 * Conversation model || Save all data of conversation
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listOfStatus = ['DONE', 'CANCELD', 'CALLING']
const ConversationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  partnerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
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
  status: {
    type: String,
    enum: listOfStatus
  }
})

const conversation = mongoose.model('conversation', ConversationSchema)
module.exports = {
  Conversation: conversation
}
