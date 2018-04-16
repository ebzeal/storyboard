const express = require("express");
const exphbs= require("express-handlebars");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('passport');
const path = require("path");

const app = express();

//load user model module
require('./models/User');
require('./models/Story');
// Passport Config
require('./config/passport')(passport);

//Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

//load keys
const keys = require('./config/keys');

//Handlebars helpers
const {
    truncate,
    stripTags,
    formatDate,
    select,
    editIcon
} = require('./helpers/hbs')

//connect mongoose
mongoose.connect(keys.mongoURI, {
   // useMongoClient =true
})
.then(() => {console.log('Mongoose Connected')})
.catch(err=>{console.log(err)});

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Method Override middleware
app.use(methodOverride('_method'));

//handlebars middleware
app.engine('handlebars', exphbs({
  helpers :{
    truncate : truncate,
    stripTags :stripTags,
    formatDate : formatDate,
    select:select,
    editIcon : editIcon
  },
  defaultLayout:'main'}));
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


// Set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
  });
  
//Use routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

//Bring in our public files static folders
app.use(express.static(path.join(__dirname, 'public')));


const port = process.env.PORT||5000;

app.listen(port, ()=>{
    console.log(`Server up on ${port}`);
})