const express = require('express')
const router = express.Router();

const News  =require('../model/news');
const User = require('../model/user');
const passport = require('passport')

console.log('Router loaded');

router.get('/', (req,res)=>{

    return res.render('home',{
        title:'Welocome to World Of Indian Gods'

    });

});

router.get('/details', async (req,res)=>{


   let news =  await News.find({});
      
        return res.render('details',{
            title:'Links To the Page',
            newz:news,
     
        
        });

});

router.get('/admin',passport.checkAdminAuthentication, (req,res)=>{
    
    return res.render('admin_NewsPost',{
        title:'Admin Post Page',
    })
    
 });

router.use('/news', require('../routes/news'));


router.use('/users', require('./user&doubt'));
router.use('/comments',require('../routes/comments'));


module.exports = router;