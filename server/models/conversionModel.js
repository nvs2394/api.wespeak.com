const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listOfStatus = ['DONE', 'CANCELD']

const ConversationSchema = new Schema({
  learnerId: String,
  tutorId: String,
  status: {
    type: String,
    enum: listOfStatus
  }
})

const conversation = mongoose.model('conversation', ConversationSchema)
module.exports = {
  Conversation: conversation
}
