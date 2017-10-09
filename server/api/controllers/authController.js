'use strict'
const superAgent = require('superagent')

/**
 * 
 * @param {*} accessToken 
 */
const fbLoginCtrl = async (accessToken) => {
  const url = 'https://graph.facebook.com/me?fields=id,email,name,age_range,birthday,picture.width(500).height(500),gender&access_token=' + accessToken

  const userData = await superAgent
    .get(url)
    .set('Accept', 'application/json')
    .then((response) => {
      return JSON.parse(response.text)
    })
    .catch((ex) => {
      return ex
    })
  return userData
}

module.exports = {
  fbLoginCtrl
}
