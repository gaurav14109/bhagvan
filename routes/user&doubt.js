const express = require('express')
const Router = express.Router();
const passport = require('passport');
const Post = require('../model/post');
const User = require('../model/user');
const bcrypt = require('bcrypt')
const saltRounds = 10;


Router.post('/post', passport.checkAuthentication, (req, res)=>{

    //passport.checkAuthentication will check if user is logged in.if yes next to next controoler

    Post.create({
        content:req.body.question,
        user:req.user
    },(err, data)=>{
        if(err){console.log(err); return;}
      
        req.flash('success', 'Posted Successfully')
        return res.redirect('back');
    });

})


Router.post('/signup', (req, res)=>{

    if(req.body.password != req.body.confirm_password){
        req.flash('error','Invalid Password')
        return res.redirect('back')
    }
    User.findOne({email:req.body.email},(err,userExist)=>{
        
        if(userExist){
            req.flash('error', 'Same Email is impossible kindly signup again')
                return res.redirect('back')
        }
        else{
        bcrypt.hash(req.body.password,saltRounds,function(err,hash){
           User.create({
                name:req.body.name,
                email:req.body.email,
                password:hash
             },(err,user)=>{
    
                if(err){
                    console.log(err);
                }
                console.log(user)
                req.flash('success', 'Signed Up Successfully Please Signup')
                return res.redirect('back');
    
             });  
        })
    
        }

    });

});

//passport.authenticate will call the local stratergy. if failure redirect else controller will check in the validation that is done.
Router.post('/login', passport.authenticate(
    'local',
    {failureRedirect: '/details'
    },
   ),  function(req, res) {
    req.flash('success', 'logged in successfully');
    res.redirect('/details');//user is passed in when it is success
  });


Router.get('/questions', passport.checkAuthentication ,(req, res)=>{

      Post.find({}).sort('-createdAt').populate('user').populate({ //populating comments from post to all user in post
        path: 'comments',//comment
        populate: {
            path: 'user',//as comment so inside comment populated user commetn has user init so nested populate
        }
    }).exec(function (err, posts){ //populate the comments field
        if(err){
            console.log(err)
        }
      return   res.render('post',{
            title:'User Doubt',
            posts:posts
         });
     })
});




Router.get('/sign-out', (req,res)=>{

    req.logout();
    req.flash('success', 'logged out successfully');
     return res.redirect('/');
});

    

module.exports = Router;