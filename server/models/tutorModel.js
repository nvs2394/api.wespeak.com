const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listOfStatus = ['ACTIVE', 'IN_ACTIVE']

const TutorSchema = new Schema({
  userId: {
    type: String
  },
  status: {
    type: String,
    enum: listOfStatus
  }
})

const tutor = mongoose.model('tutor', TutorSchema)
module.exports = {
  Tutor: tutor
}
