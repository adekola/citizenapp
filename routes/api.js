
var mongoose = require('mongoose');
var Report = mongoose.model('Report');

module.exports = function(app){
    app.get('/api/', function(req, res){
        res.send('Hey');
    });
}