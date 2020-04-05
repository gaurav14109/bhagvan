module.exports.setFlash = function(req, res, next){
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }

    //What is does is send response to the browser when the login i and out is doen  with the req object which is created at logon and logout
    //using req.flash creating the req object for flash and res for success.is stored in session so it is used as locals.flash
    //key is 'success' req.flash('key') to pass it to ejs template.
    next();
}