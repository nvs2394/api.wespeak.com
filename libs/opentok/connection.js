const config = require('config')
const OpenTok = require('opentok')

const init = () => {
  const opentok = new OpenTok(config.get('openTok.apiKey'), config.get('openTok.apiSecret'))
  return opentok
}

module.exports = init()
