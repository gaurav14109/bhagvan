const express = require('express')
const Router = express.Router();
const Post = require('../model/post')




Router.post('/post', (req, res)=>{

    Post.create({
        content:req.body.question
    },(err, data)=>{
        if(err){console.log(err); return;}
        console.log(data)
        return res.redirect('back');
    });

})

Router.get('/questions', (req, res)=>{

      Post.find({}).sort('-createdAt').populate('comments').exec(function (err, posts){ //populate the comments field 
        res.render('post',{
            title:'User Doubt',
            posts:posts
         });
     })
    });
  

module.exports = Router;