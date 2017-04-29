'use strict';
const express = require('express');
const router = express.Router();


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
    return res.send('User created');
});



module.exports = router;