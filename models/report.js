
// Report model

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var createdDate = require('../plugins/createdDate');

var schema = new mongoose.Schema({
    category: String, 
    type: String,
  location: {type: [], index: '2d'}, 
  comment: String
});

// in production we disable auto index creation
// schema.set('autoIndex', false);

//set index on location

// add created date property
schema.plugin(createdDate);

schema.statics.findByDate = function(date, cb){
    this.find({'created': date}, cb);
}

schema.statics.findByLocation = function(latitude, longitude, maxDistance, cb){
    this.find({'location': {$near: [latitude, longitude], $maxDistance: maxDistance}}, cb);
}

schema.statics.findByCategory = function(category, cb){
    this.find({'category': category}, cb);
}

schema.statics.findByType = function(type, cb){
    this.find({'type':  type}, cb);
}


module.exports = mongoose.model('Report', schema);