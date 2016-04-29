'use strict';

var express = require("express");
var app     = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//maybe
var url = require('url');

app.use(express.static('public'));
// app.use(express.static(__dirname, 'node_modules'));

console.log(__dirname+'/node_modules');
console.log(__dirname+'/public');

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
io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });

});




app.listen(3000);

//io.listen(server);

console.log("Running at Port 3000");
