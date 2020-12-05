var mongoose = require('mongoose');
require('../models/adminModel');
require('../models/category');
require('../models/branch');
require('../models/courses');
require('../models/stuReg');
require('../models/combi');
require('../models/profileUrl')
function dbConnection() {

    mongoose.connect('mongodb://localhost:27017/project').then(() => {
        console.log("Database connected successfully");

    })
        .catch((error) => {
            console.log("Error in connecting to Database");
        });

}
module.exports = {
    dbConnection
}
