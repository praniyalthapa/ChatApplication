const express =require('express');
const http=require('http');
const socketio=require('socket.io');
const app=express();
const server=http.createServer(app); //it is comming from http module
const io=socketio(server);
io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
  //socket.on is for liestening the events from frontend
  socket.on('from_client',()=>{
    console.log('event comming from client');
   });



    setInterval(()=>{
      socket.emit('hello I am server')
    },2000);
   



  });
//in express to connect with static file like html we do
app.use('/',express.static(__dirname + '/public')); //this middleware maps where your static file is located



server.listen(3000,()=>{
    console.log("Server started");
});

