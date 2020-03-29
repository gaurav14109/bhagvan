const express = require('express')
const router = express.Router();
const News = require('../model/news')

router.post('/', (req, res)=>{
path = null
try{
    News.uploadedAvatar(req, res, function(err){
        console.log(req.body.news)
        if (err) {console.log('*****Multer Error: ', err)}

        if (req.file){
            // this is saving the path of the uploaded file into the avatar field in the user
            path = News.avatarPath + '/' + req.file.filename;
        }
        News.create({
            news:req.body.news,
            avatar:path            
        });
        return res.redirect('back');

    });
}

catch(e){

    console.log(e);
}
});

module.exports = router