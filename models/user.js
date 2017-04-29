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