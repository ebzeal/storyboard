const express = require("express");
const exphbs= require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('passport');

const app = express();

//load user model module
require('./models/User');
// Passport Config
require('./config/passport')(passport);

//Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');

//load keys
const keys = require('./config/keys');

//connect mongoose
mongoose.connect(keys.mongoURI, {
   // useMongoClient =true
})
.then(() => {console.log('Mongoose Connected')})
.catch(err=>{console.log(err)});

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//cookies and session middlewares
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Use routes
app.use('/', index);
app.use('/auth', auth);


const port = process.env.PORT||5000;

app.listen(port, ()=>{
    console.log(`Server up on ${port}`);
})