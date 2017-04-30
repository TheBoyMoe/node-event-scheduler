'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define the UserSchema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});


// authenticate login input against database document for user - call authenticate on the user object
UserSchema.statics.authenticate = function(email, password, callback) {
    // find a user with a matching email
    User.findOne({email: email})
        .exec((error, user)=>{
            if(error) return callback(error);
            else if(!user){
                let err = new Error('User not found');
                err.status = 401;
                return callback(err);
            }
            // compare stored password vs entered
            bcrypt.compare(password, user.password, (error, result)=>{
                if(result === true) return callback(null, user); // return the user object
                else return callback();
            });
        });
};


// hash the password before saving the record
UserSchema.pre('save', function (next) {
   let user = this;
   bcrypt.hash(user.password, 10, (err, hash)=>{
       if(err) return next(err);
       user.password = hash;
       next();
   })
});

// create the User model and export
const User = mongoose.model('User', UserSchema);
module.exports = User;