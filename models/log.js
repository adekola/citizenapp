
// Report model

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var createdDate = require('../plugins/createdDate');

var schema = new mongoose.Schema({
    requestIP: String, 
    requestURL: String
});

schema.plugin(createdDate);

module.exports = mongoose.model('Log', schema);