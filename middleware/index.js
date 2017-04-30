/* Custom middleware */
'use strict';

// ensure logged in users are redirected to their calendar
const loggedOut = (req, res, next)=>{
    if(req.session && req.session.userId)
        return res.redirect('/calendar');
    return next();
};

module.exports = {
    loggedOut
};
