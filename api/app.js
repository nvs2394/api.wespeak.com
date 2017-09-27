var express = require('express'),
    routes = require('./routes');

module.exports = function setupAPI() {
  console.log("Init setup")
  var apiApp = express();
  apiApp.use(routes());

  return apiApp;
};
