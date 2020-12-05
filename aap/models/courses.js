let mongoose = require('mongoose');

let addCourseSchema = new mongoose.Schema({
    courses: {
        type: String,
        required: true,
        unique:true
    }


});
module.exports = mongoose.model('course', addCourseSchema);