//****loading the modules****
require("dotenv").config();
const express = require('express');
const app = express();
  //app is an instance of express
  //the above two lines initialise express
var bodyParser =  require('body-parser');
var cors = require('cors');
const errorHandler = require('./handlers/error');
const db = require("./models");
//declare a port to use
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const {loginRequired, ensureCorrectUser} = require("./middleware/auth");
const PORT = 3002;

app.use(bodyParser.json());
//to implement bodyparser to parse json
//we do not use url encoded here
app.use(cors()); //to use cors

//*****all routes here*******//
// //whenever their is a request /api/auth then authRoutes is accessed
  app.use("/api/auth", authRoutes);
  app.use("/api/users/:id/messages", loginRequired, ensureCorrectUser, messagesRoutes);

  app.get("/api/messages", loginRequired, async function(req,res,next){
    try{
      //get the messages using find
      //sort them in descending order of timestamps
      //we can get username and profileImageUrl for every message on timeline
      let messages = await db.Message.find()
      .sort({createdAt: "desc"})
      .populate("user",{
          username: true,
          profileImageUrl: true
      });
      return res.status(200).json(messages);
    }catch(err){
      return next(err);
    }
  })


//error handling using express
app.use(function(req,res,next){  //4 parameters
  let err=new Error("Not Found");
  err.status = 404;
  next(err);

});
//error handler in json form
app.use(errorHandler);

//binds and listens for connections on the specified host and PORT
app.listen(PORT, function(){
  console.log(`Server is running on port ${PORT}`);
});
