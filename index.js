const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;

app.use(express.static('./assets'));
var sassMiddleware = require('node-sass-middleware')
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
