'use strict';


var express = require('express');
var app     = express();
var server  = app.listen(3000);
var io      = require('socket.io').listen(server);

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/bluedrop';


var insertVisit = function(db, data, callback) {
  var latValue = data[0];
  var lngValue = data[1];
  var citySlug = data[2];
  console.log(citySlug);
  console.log("insert visit function");

  db.collection('visits').insertOne( {
      'lat': latValue,
      'lng': latValue,
      'citySlug': citySlug
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the visits collection.");
    callback();
  });
}


// token - valid
// google search:

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static('public'));

// Display map
app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
});

// Extract params from urls (GET function) AND 'blast' coordinates clicked
app.get('/view/:lat/:long/', function(req, res){
  res.header('Access-Control-Allow-Methods', 'GET');
	var data = [req.params.lat, req.params.long];
  MongoClient.connect(url, data, function(err, db) {
    assert.equal(null, err);
    console.log("Connected succesfully to server: Visits Table");
    insertVisit(db, data, function() {
        db.close();
      });
  });
	res.send(data);
	io.emit('displayMarker', data);
});

console.log("Running at Port 3000");
