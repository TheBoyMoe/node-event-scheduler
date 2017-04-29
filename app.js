'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

// mongoose and db connect
mongoose.connect('mongodb://localhost:27017/eventcalendardb');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

/*----------- middleware ---------------*/

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// serve static files from 'public'
app.use(express.static(path.join(__dirname, '/public')));

// define the view engine
app.set('view engine', 'pug');
app.set('views', path(__dirname, '/views'));

// include routes
app.use('/', routes);

// catch 404 errors and forward to the error handler
app.use((req, res, next)=>{
    let err = new Error('File not found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port, ()=>{
    console.log(`Express is listening on port ${port}`);
});