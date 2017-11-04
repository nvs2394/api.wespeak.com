'use strict'
const mongoose = require('mongoose')
const Review = mongoose.model('review')

/**
 * 
 * @param {*} userId 
 */
const createReview = ({conversationId, ...rest}) => {
  const { partnerStar, qualityStar, comment, reviewerId } = rest
  const review = new Review({
    conversationId,
    rating: {
      partner: partnerStar,
      quality: qualityStar
    },
    comment,
    reviewerId
  })

  try {
    const newReview = review.save()
    return newReview
  } catch (error) {
    throw Error(error)
  }
}

module.exports = {
  createReview
}
