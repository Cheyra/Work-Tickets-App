//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
// this name will change depending on what database you create (see ../../models)
var Ticket = require('../../models/index');
var Login = require('../../models/login')

//retrieves everything in database
router.get('/', function(req, res){
  res.render('index')
});
// ****************index routes******************* //
// adds to database
router.route('/insert')
.post(function(req,res) {
 var ticket = new Ticket();
  ticket.first = req.body.first;
  ticket.last = req.body.last;
  ticket.employeeID = req.body.employeeID;
  ticket.description = req.body.description;

ticket.save(function(err) {
      if (err)
        res.send(err);
      res.send('Ticket successfully added!');
  });
})

// updates existing entry in database
router.route('/update/:id')
.post(function(req, res) {
 const doc = {
  first: req.body.first,
  last: req.body.last
 };
 console.log(doc);
  Ticket.update({_id: req.params.id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Ticket successfully updated!');
  });
});

// deletes an entry in database that contains specified unique id
router.get('/delete/:id'  , function(req, res){
 Ticket.find({_id: req.params.id}).remove().exec(function(err, name) {
  if(err)
   res.send(err)
  res.send(name);
 })
});

// can be modified to retrieve all entries that match a certain query
router.get('/getAll/:id',function(req, res) {
 //insert query 
 Ticket.find({employeeID: req.params.id})
 .then(dbModel => res.json(dbModel))
});
// can be modified to retrieve all entries that match a certain query
router.get('/getAll',function(req, res) {
 //insert query 
 Ticket.find()
 .then(dbModel => res.json(dbModel))
});
// *************login routes******************** //
// retrieves all entries
router.get('/getAllLogin',function(req, res) {
  //insert query 
  Login.find()
  .then(dbModel => res.json(dbModel))
 });
router.get('/getAllLogin/:id',function(req, res) {
  //insert query 
  Login.find({employeeID: req.params.id})
  .then(dbModel => res.json(dbModel))
 });
 // adds to database
router.route('/insertLogin')
.post(function(req,res) {
 var login = new Login();
  login.first = req.body.first;
  login.last = req.body.last;
  login.employeeID = req.body.employeeID;
  login.facility = req.body.facility;
  login.passwordSet = req.body.passwordSet;
  login.admin = req.body.admin;

login.save(function(err) {
      if (err)
        res.send(err);
      res.send('Ticket successfully added!');
  });
})
router.route('/updateLogin/:id')
.post(function(req, res) {
 const doc = {
  password: req.body.password,
  passwordSet: true

 };
 console.log(doc);
  Login.update({employeeID: req.params.id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Employee successfully registered!');
      // res.redirect("./homepage")
  });
});
module.exports = router;