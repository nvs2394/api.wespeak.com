const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SettingSchema = new Schema({
  name: String
})

const setting = mongoose.model('setting', SettingSchema)
module.exports = {
  Setting: setting
}
