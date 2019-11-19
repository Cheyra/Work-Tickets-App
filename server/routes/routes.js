//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
// this name will change depending on what database you create (see ../../models)
var Name = require('../../models/index');

//retrieves everything in database
router.get('/', function(req, res){
  res.render('index')
});

// adds to database
router.route('/insert')
.post(function(req,res) {
 var name = new Name();
  name.first = req.body.first;
  name.last = req.body.last;

name.save(function(err) {
      if (err)
        res.send(err);
      res.send('Name successfully added!');
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
  Name.update({_id: req.params.id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Name successfully updated!');
  });
});

// deletes an entry in database that contains specified unique id
router.get('/delete/:id'  , function(req, res){
 Name.find({_id: req.params.id}).remove().exec(function(err, name) {
  if(err)
   res.send(err)
  res.send('Name successfully deleted!');
 })
});

// can be modified to retrieve all entries that match a certain query
router.get('/getAll',function(req, res) {
 //insert query 
 Name.find()
 .then(dbModel => res.json(dbModel))
});

module.exports = router;