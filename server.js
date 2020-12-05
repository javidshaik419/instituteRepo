var db = require('./aap/database/db');
var route=require('./aap/routers/routes');
var hbs=require('hbs')

var express = require('express');
var cors = require('cors')

var app = express();
app.set("view engine","hbs")

var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(cors())

route.api(app)
const port = 5000;
app.listen(port,() => {
    db.dbConnection();
    
    console.log("server is listening on"+"--"+port);

});