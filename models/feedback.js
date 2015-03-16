
// Feedback model

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var createdDate = require('../plugins/createdDate');

var schema = new mongoose.Schema({
    name: String, 
    email: String,
    gender:String, 
    comment: String
});

// in production we disable auto index creation
// schema.set('autoIndex', false);

//set index on location

// add created date property
schema.plugin(createdDate);



module.exports = mongoose.model('feedback', schema);