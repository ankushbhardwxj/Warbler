//loading mongoose
const mongoose = require('mongoose')
mongoose.set("debug",true); //set debugging mode to true
//need not be declared in version 5
mongoose.Promise=Promise;

//used to connect to mongodb //keepAlive and useMongoClient are new attributes
//remember never to use the port here
mongoose.connect('mongodb://localhost/warbler',{
  keepAlive: true
  // useMongoClient:true

});
//both modules are exported here
module.exports.User = require("./user");
module.exports.Message = require("./message");
