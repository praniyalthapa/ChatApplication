const mongoose=require('mongoose');
const connect=async()=>{
    await mongoose.connect('mongodb://localhost/chatapp'); //using mongoose.connect we connect to mongodb server

}
module.exports=connect;
