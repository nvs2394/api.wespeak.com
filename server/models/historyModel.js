const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HistorySchema = new Schema({
  userId: String
})

const history = mongoose.model('history', HistorySchema)
module.exports = {
  Listory: history
}
