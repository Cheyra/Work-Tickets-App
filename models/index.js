var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// can change this schema to name of choosing and can edit 
//and add fields but make sure to update routes(../server/routes)
var schemaName = new Schema({
  first: String,
  last: String
  });

module.exports = mongoose.model('Name', schemaName);