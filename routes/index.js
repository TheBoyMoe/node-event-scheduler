'use strict';
const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const mid = require('./../middleware/index');

// GET / - ensure that logged in users cannot reach login form
router.get('/', mid.loggedOut, (req, res, next)=>{
    return res.render('login', {title: 'Login'});
});

// GET /signup - ensure that logged in users cannot reach signup form
router.get('/signup', mid.loggedOut, (req, res, next)=>{
    return res.render('signup', {title: 'Signup'});
});


// POST / - handle login submission form data
router.post('/', (req, res, next)=>{
    let email = req.body.email, password = req.body.password;
    if(email && password){
       User.authenticate(email, password, (error, user)=>{
           if(error || !user){
               let err = new Error('Wrong email or password submitted');
               err.status = 401;
               return next(err);
           } else {
               // user authenticated, create session by adding a userId to the session prop on the req object
               req.session.userId = user._id;
               return res.redirect('/calendar');
           }
       })
    } else {
        let err = new Error('Email and password are required');
        err.status = 401;
        return next(err);
    }
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
            else {
                req.session.userId = user._id; // automatically log the user in by creating a session
                return res.redirect('/calendar');
            }
        });
        
    } else {
        // return error to error handler
        let err = new Error('All fields required');
        err.status = 400;
        return next(err);
    }
});


// GET /calendar - redirect user to calendar when they've been successfully logged in
router.get('/calendar', mid.checkLogin, (req, res, next)=>{
    // check that the user is logged in - handled by requiresLogin()
    // if(!req.session.userId){
    //     let err = new Error('You are not authorized to view this page');
    //     err.status = 403; // forbidden
    //     next(err);
    // }
    // user successfully authenticated, retrieve their information - calendar events
    User.findById(req.session.userId)
        .exec((error, user)=>{
            if(error) return next(error);
            else {
                // TODO query mongo, retrieving all events belonging to the user
                return res.render('calendar', {
                    title: 'Calendar',
                    name: user.name,
                    email: user.email
                })
            }
        })
});

// GET /logout
router.get('/logout', (req, res, next)=>{
    // if the user's logged in, destroy the session
    if(req.session){
        req.session.destroy((err)=>{
            if(err) return next(err);
            else return res.redirect('/');
        })
    }
});


module.exports = router;