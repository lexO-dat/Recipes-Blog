const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const multer = require('multer');
const path = require('path');  // Agrega esto para manejar rutas
const alert = require('alert'); // Para mostrar alertas en el navegador
const swal = require('sweetalert');


const app = express();
const port = process.env.port || 3000;

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);
app.use(cookieParser('CookingBlogSecure'));
app.use(session({
    secret: 'CookingBlogSecure',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());


//multer error handling
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(418).json({
            err_code: err.code,
            err_message: err.message
        });
    } else {
        return res.status(500).json({
            err_code: 409,
            message: "Something went wrong, please try again later."
        });
    }
});

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js');
const { error } = require('console');
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
