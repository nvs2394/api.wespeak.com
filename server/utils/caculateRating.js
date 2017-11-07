const getAverage = (reviews) => {
  const people = reviews.length
  let rating = reviews.reduce((pre, cur) => {
    return ((pre + cur.rating.partner) + (pre + cur.rating.partner) / 2)
  }, 0)
  return rating / people
}
module.exports = {
  getAverage
}
