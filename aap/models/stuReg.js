'use strict';
let mongoose = require('mongoose');
let stuRegSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        

    }, lastName: {
        type: String,

    }, email: {
        type: String,
        unique:true

    },
    password: {
        type: String,
        unique:true

    },
    mobile: {
        type: Number,
        unique:true

    }, gender: {
        type: String,

    }, branch: {
        type: String,

    }, serverTechnology: {
        type: String,

    },education: {
        type: String,

    },
    role: {
        type: String,

    },loginAttempts:{
        type:Number
    }
   


}, {
    timestamps: { createdAt: true, updatedAt: true }
});
module.exports = mongoose.model('students', stuRegSchema);