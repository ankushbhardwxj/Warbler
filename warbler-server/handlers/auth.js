//we import the database because authentication will be done on database
//jwt imported so that token can be generated
const db = require("../models");
const jwt = require("jsonwebtoken");
//we make functions signin and signup
exports.signin = async function(req,res,next){
  //finding the username
  //checking the password that was sent to the Server
  //if it all matches, log them in
  try{
    let user = await db.User.findOne({
      email: req.body.email
    });
    let {id, username, profileImageUrl}= user;
    let isMatch = await user.comparePassword(req.body.password);
    if(isMatch){
      let token = jwt.sign({
        id, username, profileImageUrl
      }, process.env.SECRET_KEY);
      return res.status(200).json({
        id, username, profileImageUrl, token
      });
    }else{
      return next({
        status: 400,
        message: "Invalid Email/Password"
      })
    }
  }catch(err){
    return next({
      status: 400,
      message: "Invalid Email/Password"
    })
  }

};

//we make a async function with req res next
exports.signup = async function(req,res,next){
  try{
      let user = await db.User.create(req.body);
      let {id, username, profileImageUrl} = user;
      let token = jwt.sign({
        id, username, profileImageUrl
      }, process.env.SECRET_KEY
  );
  return res.status(200).json({
    id, username, profileImageUrl, token
  });
    //create a user
    //create a token(signing a token)
    //from process.env.SECRET_KEY
  }catch(err){
    //if a validation fails
    //instead of mongoose errors we use following
    if(err.code === 11000){
      err.message = "Sorry, username/email already taken";
    }
    return next({
      status: 400,
      message: err.message
    });
    //see what kind of errors
    //if it is a certain errors
    //respond with username/email already taken
    //otherwise just send back a generic 400
  }
};
module.exports=exports;
