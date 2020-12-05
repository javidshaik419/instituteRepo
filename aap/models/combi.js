let mongoose = require('mongoose');

let addCourseWithCatSchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: true,
    },
    categorys: {
        type: String,
        required: true, 
    },
    course: {
        type: String,
        required: true
    }  

});
module.exports = mongoose.model('combined', addCourseWithCatSchema);