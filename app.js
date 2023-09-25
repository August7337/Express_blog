if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./utils/path');
const bcrypt = require('bcrypt');

const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');

const app = express();
app.use(express.urlencoded({extended:false}));

const users = [];

app.set('view engine', 'ejs');
app.set('views', 'views')

//Static files
app.use(express.static(path.join(rootDir, 'public')));
app.use('/css', express.static(path.join(rootDir, 'node_modules','bootstrap', 'dist', 'css')));
app.use(bodyParser.urlencoded({extended: false}));

//Routes
app.use(homeRoutes);
app.use('/admin', adminRoutes);
app.use((req, res) => {
    const viewsData = {
        pageTitle: 'Page Note Found'
    };
    res.status(404).render('404', viewsData);
});

// Start local server 
app.listen(8080, () => {
    console.log('server started at port 3000');
});