const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SettingSchema = new Schema({
  name: String,
  showGuide: {
    type: Boolean,
    default: true
  }
})

const setting = mongoose.model('setting', SettingSchema)
module.exports = {
  Setting: setting
}
