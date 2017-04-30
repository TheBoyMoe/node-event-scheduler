/* Custom middleware */
'use strict';

// ensure logged in users are redirected to their calendar
const loggedOut = (req, res, next)=>{
    if(req.session && req.session.userId)
        return res.redirect('/calendar');
    return next();
};

// ensure that a user is logged in
const requiresLogin = (req, res, next)=>{
    if(req.session && req.session.userId)
        return next();
    else {
        let err = new Error('You are not authorized to view this page!');
        err.status = 403;
        next(err);
    }
};

// ensure that users cannot view a calendar without being logged in
const checkLogin = (req, res, next)=>{
    // redirect user to the login page
    if(!req.session || !req.session.userId)
        return res.redirect('/');
    return next(); // otherwise carry on
};

module.exports = {
    loggedOut,
    requiresLogin,
    checkLogin
};
