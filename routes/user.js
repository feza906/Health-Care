const express = require('express');
const router = express.Router();
var path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const passport = require('passport');

//user model
const User = require('../models/User');

router.use(bodyParser.json());

router.use(express.static('public'))


router.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
    
    });
 

//register

router.post('/register',(req,res) => {
  //console.log(req.body);
    const {name,email,password} = req.body;
    //console.log(name,email,password);
    User.findOne({email : email})
        .then(user => {
            if(user)
            //user exists
            res.send(`<h1>USER ALREADY EXIST GO BACK AND TRY AGAIN WITH NEW EMAIL</h1>`)

            else{
                const newUser = new User({
                    name,
                    email,
                    password
                });
                
                //hash password
                bcrypt.genSalt(10, (err,salt) => 
                bcrypt.hash(newUser.password,salt,(err,hash) =>{
                    if(err) throw err;
                    //set password as hash
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                }))
            }
        })


})


//login
router.post('/login',(req,res,next) => {
    passport.authenticate('local',{
        successRedirect: '/about',
        failureRedirect:'/users/login',
        failureFlash: true

    })(req,res,next);
});

module.exports = router;