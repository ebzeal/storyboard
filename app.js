const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');

const app = express();

//load user model module
require('./models/User');
// Passport Config
require('./config/passport')(passport);

//Load Routes
const auth = require('./routes/auth');

//load keys
const keys = require('./config/keys');

//connect mongoose
mongoose.connect(keys.mongoURI, {
   // useMongoClient =true
})
.then(() => {console.log('Mongoose Connected')})
.catch(err=>{console.log(err)});

app.get('/', (req,res)=>{
    res.send("Page up!");
})

app.use('/auth', auth);

const port = process.env.PORT||5000;

app.listen(port, ()=>{
    console.log(`Server up on ${port}`);
})