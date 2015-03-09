var errors = require('./errors');
var reports = require('./reports');
var api = require('./api');

var mongoose = require('mongoose');
var Report = mongoose.model('Report');

module.exports = function (app) {

  // home page
  app.get('/', function (req, res) {
      //Render home page!
      res.send('Hey Man! Welcome to Citizen App');
    });
  

  // reports routes
  reports(app);

  // error handlers
  errors(app);
  
  //API route handlers
  api(app);
}