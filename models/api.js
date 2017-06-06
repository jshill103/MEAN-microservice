var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var thingSchema   = new Schema({
    Subject: String,
    Status: String,
    Data: String
});

module.exports = mongoose.model('thing', thingSchema);