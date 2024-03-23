const express =require('express');
const http=require('http');
const socketio=require('socket.io');
const connect=require('./config/database-config');
const app=express();
const server=http.createServer(app); //it is comming from http module
const io=socketio(server);
io.on('connection', (socket) => {
   // console.log('a user connected',socket.id);
    socket.on('join_room', (data) => {
      console.log('joining a room', data.roomid);
      socket.join(data.roomid);
  });
  //socket.on is for liestening the events from frontend
  socket.on('msg-send',(data)=>{ //when u r listening to the event you need a callback which takes parameter (data) in which there is same object which u r sending
    console.log(data); //listening the message from server 
    // io.emit('msg-received',data);//server is going to now emit/semd and event all the connection that are present 
    //  socket.emit('msg-received',data);//it will not send data too all the connected services
    io.to(data.roomid).emit('msg-received',data); //except the sender other will get the message
  })
  });
//in express to connect with static file like html we do
app.set('view engine','ejs');
app.use('/',express.static(__dirname + '/public')); //this middleware maps where your static file is located
app.get('/chat/:roomid',(req,res)=>{
  res.render('index',{   // it will render index.ejs file
    name:'Praniyal',
    id:req.params.roomid
  });
})
server.listen(3000,async()=>{
    console.log("Server started");
    await connect();
    console.log("mongodb connected");
});

