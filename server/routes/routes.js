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
  ticket.date = req.body.date;
  ticket.open = req.body.open;
  ticket.status = req.body.status;
  ticket.problemType = req.body.problemType;

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
  open: false
 };
 console.log(doc);
  Ticket.update({_id: req.params.id}, doc, function(err) {
      if (err)
        res.send(err);
      res.send('Ticket successfully updated!');
  });
});
// updates existing entry in database
router.route('/updateStatus/:id')
.post(function(req, res) {
 const doc = {
  status: req.body.status
 };
 console.log(doc);
  Ticket.update({_id: req.params.id}, doc, function(err) {
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
router.get('/getOpenTickets/:id',function(req, res) {
 //insert query 
 Ticket.find({employeeID: req.params.id})
 .then(dbModel => res.json(dbModel))
});

// can be modified to retrieve all entries that match a certain query
router.get('/getAllTickets',function(req, res) {
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
 //retrieves login that matches the employee id
router.get('/getLogin/:id',function(req, res) {
  //insert query 
  Login.findOne({employeeID: req.params.id})
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
      if (err){
       return res.send(err);
      }
      // res.send('Employee successfully registered!');
    
  });
});
module.exports = router;