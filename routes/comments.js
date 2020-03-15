const express = require('express')
const router = express.Router();
const Comment = require('../model/comment');
const Post = require('../model/post');

router.post('/create', (req, res)=>{

    Post.findById(req.body.post,(err,post)=>{
        
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post
            },(err,comment)=>{
                post.comments.push(comment); //it will store the object id of coment
                post.save();
             
                return res.redirect('back');
            });

        }
    });
})

module.exports = router