//https://socket.io/get-started/chat
var socket = io();
let btn=document.getElementById('btn');
let inputMsg=document.getElementById('msg');
let msgList=document.getElementById('msg-list');
  btn.onclick=function exec(){
    socket.emit('msg-send',{
        msg:inputMsg.value
    });
  }
  socket.on('msg-received',(data)=>{   //this is listener which collectes the message from server and do the given tasks
    let  limsg=document.createElement('li');
    limsg.innerText=data.msg;
    msgList.appendChild(limsg);
  })

 