'use strict';
const express = require('express');
const router = express.Router();


// GET /
router.get('/', (req, res, next)=>{
    return res.render('login', {title: 'Login'});
});

router.get('/signup', (req, res, next)=>{
    return res.render('signup', {title: 'Signup'});
});

module.exports = router;