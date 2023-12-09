const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = process.env.port || 3000;

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));

//name of the folder where the static files are located
app.use(express.static('public'));

//middleware for ejs
app.use(expressLayouts);

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
    secret: 'CookingBlogSecure',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(fileUpload());

//set the layout for all ejs files
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


//set the routes for the app
const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);


//make the app listen on the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

