let mongoose = require('mongoose');
/*mongoose also can be any name*/
/*userRegSchema can be any name*/
let addCategorySchema = new mongoose.Schema({
    categorys: {
        type: String,
        required: true,
        unique:true
    }


});
module.exports = mongoose.model('category', addCategorySchema);