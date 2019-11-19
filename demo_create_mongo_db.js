
// run by entering  node demo_create_mongo_db.js in your terminal  
//when run it creates a mongo database called mydb
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});