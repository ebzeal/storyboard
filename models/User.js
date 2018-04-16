const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const userSchema = new Schema({
    googleID:{
        type:String,
        required:true  //If there are othere authentiaction methods, this shoul not be true
    },
    email:{
        type:String,
        required:true
    },
    firstName :{
        type:String
    },
    lastName :{
        type:String
    },
    image:{
        type:String
    }

});

//Create Collection and add Schema
mongoose.model('users', userSchema); 