const express = require("express");
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const multer = require("multer");
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')
const { CourierClient } = require("@trycourier/courier");
require('dotenv').config()

require("./config/passport")(passport);



const app = express();

//DB Config

const db = require('./config/keys').MongoURI;

//connect to mongo
mongoose.connect(db,{useNewUrlParser: true})
    .then(() => console.log('MOngoDB Connected'))
    .catch(err => console.log(err));


//Bodyparser
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())






//express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    
  }));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flas
app.use(flash());


//global variables
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})



//routes

app.use('/',require('./routes/index'));

app.use('/users',require('./routes/user'));


//import { CourierClient } from "@trycourier/courier";
// alternatively:




const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`SERVER started on port ${PORT}`));