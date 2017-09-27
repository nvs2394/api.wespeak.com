var express = require('express'),
    api = require('../api');

module.exports = function apiRoutes() {
  var apiRouter = express.Router();
  console.log(api.users.read)
  apiRouter.get('/', (req, res) => {
    api.users.read(req, res);
  });
  return apiRouter;
}
