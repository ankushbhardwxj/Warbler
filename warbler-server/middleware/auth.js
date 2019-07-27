//request ---> middleware ---> handler
require("dotenv").config();
const jwt = require("jsonwebtoken");
//make sure user is logged in - Authentication
exports.loginRequired = function(req,res,next){
  //get token from HTTP header
  //name of header authorization- its of the form Bearer djfdfbsdfbc
  //we require the gibberish part so we split the string
  try{
      const token = req.headers.authorization.split(" ")[1];
      //decode the token using jwt verify
      //first parameter is token second parameter is SECRET_KEY
      //third parameter is a payload - if decoded go to next handler
      //otherwise the token cannot be decoded
      jwt.verify(token, process.env.SECRET_KEY, function(err,decoded){
        if(decoded){
          return next();
        }else{
          return next({
              status: 401,
              message: "Please log in first"
          });
        }
      });
  }catch(err)
  {
      return next({
        status: 401,
        message: "Please log in first"
      });
  }

};

//make sure we get correct user - Authorization
//make sure one user cannot modify other user's data
exports.ensureCorrectUser = function(req,res,next){
    try{
    //make a token like above
    //decode the token using jwt verify
    //check if decoded id and payload is equal to the params.id
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err,decoded){
      if(decoded && decoded.id === req.params.id){
        return next();
      }else{
        return next({
          status: 401,
          message: unauthorized
        });
      }
    })
    }catch(err){
      return next({
        status: 401,
        message: unauthorized
      });
    }
};
