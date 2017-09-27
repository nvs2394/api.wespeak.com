var express = require('express');

module.exports = function setupApp() {
  console.log('cykablyat')
  var parentApp = express();
  parentApp.use('/api', require('./api/app')());
  return parentApp;
}

