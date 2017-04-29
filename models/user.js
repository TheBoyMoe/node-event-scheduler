'use strict';
const mongoose = require('mongoose');

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

// create the User model and export
const User = mongoose.model('User', UserSchema);
module.exports = User;