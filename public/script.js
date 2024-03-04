//https://socket.io/get-started/chat
var socket = io();
let btn=document.getElementById('btn');
btn.onclick=function exec(){
    socket.emit('from_client');
}



socket.on('hello I am server',()=>{
   // console.log('new event collected now ');
    const div=document.createElement('div');
    div.innerHTML='Listening from client';
    document.body.appendChild(div);
});