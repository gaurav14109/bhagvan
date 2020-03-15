const mongoose = require('mongoose')


const postSchema = mongoose.Schema({

    content:{
        type:String,
        require:true
    },
    //Array of comment
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }]

},{timestamps: true
});

const Post = mongoose.model('Post',postSchema)
module.exports = Post;