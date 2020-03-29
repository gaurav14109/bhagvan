const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
app.use(express.static('./assets'));
var sassMiddleware = require('node-sass-middleware')
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());//req.body.name in the form. fieldname
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
//initialize the session in browser
app.use(session({
    name: 'codeial',//cookie name
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db, //db of mongoose
        autoRemove: 'disabled'

    },function(err){
        console.log(err ||  'connect-mongodb setup ok');
    })
}));


app.use('/uploads',express.static(__dirname + '/uploads'));
//Making Upload path available to the browser.http://localhost:8000/uploads/news/avatars/avatar-1584991232580 as it serach for uploads folder 
//we define the upload folder for it. similar we define the other folder.Eg http://localhost:8000/css/links.css
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);//set user once session is created for view in by locals.

app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
