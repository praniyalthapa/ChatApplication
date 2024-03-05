const express =require('express');
const http=require('http');
const socketio=require('socket.io');
const app=express();
const server=http.createServer(app); //it is comming from http module
const io=socketio(server);
io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
  //socket.on is for liestening the events from frontend
  socket.on('msg-send',(data)=>{ //when u r listening to the event you need a callback which takes parameter (data) in which there is same object which u r sending
    console.log(data); //listening the message from server 
    io.emit('msg received',data);//server is going to now emit/semd and event all the connection that are present 
     
  })
   
   



  });
//in express to connect with static file like html we do
app.use('/',express.static(__dirname + '/public')); //this middleware maps where your static file is located



server.listen(3000,()=>{
    console.log("Server started");
});

