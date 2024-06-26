const express =require('express');
const http=require('http');
const socketio=require('socket.io');
const connect=require('./config/database-config');
const Chat=require('./models/chat');
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
  socket.on('msg-send',async(data)=>{ //when u r listening to the event you need a callback which takes parameter (data) in which there is same object which u r sending
    console.log(data); //listening the message from server 
    // io.emit('msg-received',data);//server is going to now emit/semd and event all the connection that are present 
    //  socket.emit('msg-received',data);//it will not send data too all the connected services
    const chat=await Chat.create({
      roomid:data.roomid,
      user:data.user,
      content:data.msg
    })
  

    io.to(data.roomid).broadcast.emit('msg-received',data); //except the sender other will get the message
  })
  socket.on('typing',(data)=>{
    io.to(data.roomID).emit('someone_typing');
  })


  });





//in express to connect with static file like html we do
app.set('view engine','ejs');
app.use('/',express.static(__dirname + '/public')); //this middleware maps where your static file is located
app.get('/chat/:roomid',async(req,res)=>{
  const chats=await Chat.find({
    roomID:req.params.roomid
  }).select('content user');
  console.log(chats);
  res.render('index',{   // it will render index.ejs file
    name:'Praniyal',
    id:req.params.roomid,
    chats:chats
  });
  
})
server.listen(3000,async()=>{
    console.log("Server started");
    await connect();
    console.log("mongodb connected");
});

