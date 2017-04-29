'use strict';
const express = require('express');
const router = express.Router();
const User = require('./../models/user');

// GET /
router.get('/', (req, res, next)=>{
    return res.render('login', {title: 'Login'});
});

// GET /signup
router.get('/signup', (req, res, next)=>{
    return res.render('signup', {title: 'Signup'});
});


// POST / - handle login submission form data
router.post('/', (req, res, next)=>{
    return res.send('User logged in');
});

// POST /signup - handle submission of signup form data
router.post('/signup', (req, res, next)=>{
    // check that the user has submitted all req'd info
    if(req.body.email && req.body.name && req.body.password){
        
        // create and save the user object
        let user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };
        User.create(user, (error, user)=>{
            if(error) return next(error); // pass to error handler
            else return res.redirect('/calendar');
        });
        
    } else {
        // return error to error handler
        let err = new Error('All fields required');
        err.status = 400;
        return next(err);
    }
});



module.exports = router;