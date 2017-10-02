const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  userId: String
})

const review = mongoose.model('review', ReviewSchema)
module.exports = {
  review: review
}
