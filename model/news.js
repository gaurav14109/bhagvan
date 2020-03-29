const mongoose = require('mongoose')

const multer = require('multer');

const path = require('path');
const AVATAR_PATH = path.join('/uploads/news/avatars');
const newSchema = mongoose.Schema({

    news:{
        type:String,
        require:true
    },

    avatar:{
        type:String
    },
    

},{timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {  //file contains the uploaded file
      cb(null, path.join(__dirname, '..', AVATAR_PATH));//__dirname gives the current directory name cb = callbacl.
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

  // static function for newSchema
newSchema.statics.uploadedAvatar = multer({storage:  storage}).single('avatar'); //using the static function which can be called directly.can be called with User.uploadedAvatar.
//uploadedAvatar is a function that takes in req res and call abck function since it is a multipart form  when multipart then use this function
newSchema.statics.avatarPath = AVATAR_PATH;//defining the path


const News = mongoose.model('News',newSchema)
module.exports = News;