const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LearnerSchema = new Schema({
  userId: String
})

const learner = mongoose.model('learner', LearnerSchema)
module.exports = {
  Learner: learner
}
