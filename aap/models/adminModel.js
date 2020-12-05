let mongoose = require('mongoose');
let adminRegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, email: {
        type: String,
    },
    password: {
        type: String,
    },
    loginAttempts:{
        type:Number
    },
    role: {
        type: String,
    },
    time:{
        type:String
    }


});
module.exports = mongoose.model('admin', adminRegisterSchema);



