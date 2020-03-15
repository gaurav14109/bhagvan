const express = require('express')
const router = express.Router();

console.log('Router loaded');

router.get('/', (req,res)=>{

    return res.render('home',{
        title:'Welocome to World Of Indian Gods'

    });

});

router.get('/details', (req,res)=>{

    return res.render('details',{
        title:'Links To the Page'

    });

});

router.use('/users', require('../routes/doubt'));
router.use('/comments',require('../routes/comments'));

module.exports = router;