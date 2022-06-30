const mongoose=require("mongoose");

const usersSchema= new mongoose.Schema({
    Username:{type:String, required: true},
    Password:{type:String, required: true},

})

const usersModel=mongoose.model('users', usersSchema)
module.exports=usersModel