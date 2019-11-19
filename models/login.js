var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// can change this schema to name of choosing and can edit 
//and add fields but make sure to update routes(../server/routes)
var schemaLogin = new Schema({
  facility: String,
  first: String,
  last: String,
  employeeID: Number,
  password: String,
  passwordSet: Boolean,
  admin: Boolean
  });

module.exports = mongoose.model('Login', schemaLogin);