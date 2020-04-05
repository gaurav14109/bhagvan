const express = require('express')
const router = express.Router();
const Comment = require('../model/comment');
const Post = require('../model/post');

router.post('/create', (req, res)=>{

   
    Post.findById(req.body.post,(err,post)=>{  //req.body.post will give post id through value input hidden..
        
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },(err,comment)=>{
                post.comments.push(comment); //it will store the object id of coment post has comment so post.comnt.push
                post.save();
             
                req.flash('success','comment added successfully');
                return res.redirect('back');
            });

        }
    });
})

module.exports = router