let mongoose = require('mongoose');
/*mongoose also can be any name*/
/*userRegSchema can be any name*/
let addBranchSchema = new mongoose.Schema({
    branches: {
        type: String,
        required: true,
        unique:true
    }


});
module.exports = mongoose.model('branches', addBranchSchema);