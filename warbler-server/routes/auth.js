const express = require("express");
//load express's router
const router = express.Router();
//load the signup function from handler/auth
const { signup, signin } = require("../handlers/auth");

//Whenever we get a POST request, we want to run the signup function
router.post("/signup",signup);
router.post("/signin",signin);


//export the router
module.exports = router;
