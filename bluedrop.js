'use strict';


var express = require('express');
var app     = express();
var server  = app.listen(3000);
var io      = require('socket.io').listen(server);


//maybe
var url = require('url');
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static('public'));


app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
  //__dirname : It will resolve to your project folder.
});

// Extract params from urls (GET function)
app.get('/view/:lat/:long', function(req, res){
	var data = [req.params.lat, req.params.long];
	console.log(data);
	res.send(data);
});


// Testing 'connection'
io.on('connect', function(socket){
  console.log('a user has connected');
	socket.on('message', function(data){
		console.log(data);
	});
	socket.on('CommunityClicked', function(data){
		console.log(data);
		io.emit('displayMarker', data);
	});
});


io.on('message', function(data){
	console.log('server pinged');
});


console.log("Running at Port 3000");
