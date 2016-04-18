//Lets require/import the HTTP module
var http = require('http');
var WebSocketServer = require('ws').Server;


var wss = new WebSocketServer({
  port: 3000
});

wss.on('connection',function (ws){
  ws.on('message',function(message){
    console.log('received: %s', message);
    ws.send('from server -- ' + message);
  });
});



// //Lets define a port we want to listen to
// const PORT=3000;
//
// //We need a function which handles requests and send response
// function handleRequest(request, response){
//     response.end('It Works!! Path Hit: ' + request.url);
// }
//
// //Create a server
// var server = http.createServer(handleRequest);
//
// //Lets start our server
// server.listen(PORT, function(){
//     //Callback triggered when server is successfully listening. Hurray!
//     console.log("Server listening on: http://45.55.237.122", PORT);
// });
//
// var BluedropSocket = new WebSocket("ws:45.55.237.122:3000")
//
//
// exampleSocket.onmessage = function (event) {
//   console.log(event.data);
// }
