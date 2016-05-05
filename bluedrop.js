'use strict';


var express = require('express');
var app     = express();
var server  = app.listen(3000);
var io      = require('socket.io').listen(server);


//maybe
var url = require('url');
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static('public'));

// Display map
app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
});

// Extract params from urls (GET function) AND 'blast' coordinates clicked
app.get('/view/:lat/:long', function(req, res){
	var data = [req.params.lat, req.params.long];
	console.log(data);
	res.send(data);
	io.emit('displayMarker', data);
});

console.log("Running at Port 3000");
