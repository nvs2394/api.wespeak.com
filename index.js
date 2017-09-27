var parentApp = require('./app');
var port = process.env.PORT || 8080;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

parentApp = require('./app')();
parentApp.listen(port);


