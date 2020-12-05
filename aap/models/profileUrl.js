let mongoose = require('mongoose');

let addprofileSchema = new mongoose.Schema({
    picUrl: {
        type: String,
        required: true
    }


});
module.exports = mongoose.model('pictures', addprofileSchema);