const mongoose = require('mongoose')


const postSchema = mongoose.Schema({

    content:{
        type:String,
        require:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    //Array of comment as post can have multiple comment
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }]

},{timestamps: true
});

const Post = mongoose.model('Post',postSchema)
module.exports = Post;