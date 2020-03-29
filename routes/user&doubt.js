const express = require('express')
const Router = express.Router();
const passport = require('passport');
const Post = require('../model/post');
const User = require('../model/user');




Router.post('/post', (req, res)=>{

    Post.create({
        content:req.body.question
    },(err, data)=>{
        if(err){console.log(err); return;}
        console.log(data)
        return res.redirect('back');
    });

})


Router.post('/signup', (req, res)=>{

    if(req.body.password != req.body.confirm_password){
        return res.redirect('back')
    }
    User.findOne({email:req.body.email},(err,userExist)=>{
        
        if(userExist){
                console.log('User Already Exists');
                return res.redirect('back')
        }
        else{
        User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
         },(err,user)=>{

            if(err){
                console.log(err);
            }
            console.log(user);
            return res.redirect('back');

         });   
        }

    });

});

//passport.authenticate will call the local stratergy. if failure redirect else controller
Router.post('/login', passport.authenticate(
    'local',
    {failureRedirect: '/'},
),  function(req, res) {
    res.redirect('/');//user is passed in
  });


Router.get('/questions', (req, res)=>{

      Post.find({}).sort('-createdAt').populate('comments').exec(function (err, posts){ //populate the comments field
        //find({}) all post no validations populate comment id which inside post
        res.render('post',{
            title:'User Doubt',
            posts:posts
         });
     })
});

Router.get('/sign-out', (req,res)=>{

    req.logout();
     return res.redirect('/');
});

    

module.exports = Router;