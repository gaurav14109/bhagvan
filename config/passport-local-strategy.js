const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');

passport.use(new LocalStrategy({
        usernameField: 'email' //The yserfield is email.
    },function(email, password, done){

              // find a user and establish the identity
              User.findOne({email: email}, function(err, user)  {
                if (err){
                    
                    return done(err);
                }
    
                if (!user || user.password != password){
                   
                    return done(null, false);
                }
    
                return done(null, user);//authrntication and passing user to passport passing user to passport which will be used by seerializer
            });

    }// email i.e the usrename password 


));

passport.serializeUser(function(user, done){
    done(null, user.id);//setting seesion id
});

// deserializing the user from the key in the cookies browser send the request user_id we deserialize it.
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){ //using that id we find user again.
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);//passing itto passwort
    });
});

//sending data to views
// check if the user is authenticated rdirecting to next page
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action) req session id send.
    if (req.isAuthenticated()){ //is autentication is a method that is used to detect whether user is signed in or not
        return next();//pass to page wheere it called and for which page it isused.
    }

    // if the user is not signed in
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views 
        //setting user for views calling this function in index.js to set local user. for views
        res.locals.user = req.user; //req.user is from browser
        //console.log(res.locals.user)
    }

    next();
}


module.exports = passport;