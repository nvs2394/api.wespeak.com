/**
 * Review model || Save all data when user rating || comment
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const defaultRatingNumber = 0

const ReviewSchema = new Schema({
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
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Conversations'
  },
  comment: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: defaultRatingNumber
  }
}, {
  timestamps: true
})

const review = mongoose.model('review', ReviewSchema)
module.exports = {
  review: review
}
