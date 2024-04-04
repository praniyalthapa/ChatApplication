const mongoose=require('mongoose');
const connect=async()=>{
    await mongoose.connect('mongodb://localhost:27017/chatapp'); //using mongoose.connect we connect to mongodb server
  

}
module.exports=connect;
