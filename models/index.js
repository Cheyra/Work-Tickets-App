var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// can change this schema to name of choosing and can edit 
//and add fields but make sure to update routes(../server/routes)
var schemaTicket = new Schema({
  first: String,
  last: String,
  employeeID: Number,
  description: String,
  date: String,
  open: Boolean,
  status: String
  });

module.exports = mongoose.model('Ticket', schemaTicket);