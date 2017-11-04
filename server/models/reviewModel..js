/**
 * Review model || Save all data when user rating || comment
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  reviewerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'conversation'
  },
  comment: {
    type: String,
    default: ''
  },
  rating: {
    partner: {
      type: Number
    },
    quality: {
      type: Number
    }
  }
}, {
  timestamps: true
})

const review = mongoose.model('review', ReviewSchema)
module.exports = {
  review: review
}
