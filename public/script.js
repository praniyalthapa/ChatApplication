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

 