const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//defining the schema here
//inside the new schema object make individual schema
const userSchema = new mongoose.Schema({
  email:{
    //inside the schema object , we declare the schema types
    type: String,
    required: true,
    unique: true
  },
  username:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  profileImageUrl:{
    type: String
  },
  //foreign key from messageSchema
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  }]
});
//hashing the password using bcrypt
//we use a pre hook before saving a user
userSchema.pre('save',async function(next){
  try{
    //if password is not changed , dont do anything to it.
      if(!this.isModified('password')){
        return next();
      }
      //first parameter is the string to be hashed
      //second parameter is the salt, it makes each password different
      let hashedPassword = await bcrypt.hash(this.password,10);
      this.password = hashedPassword; //hash saved on password of document
      return next();
  }catch(err){
    //this goes directly to error handler
    return next(err);
  }
});
//method to compare hashedPassword
userSchema.methods.comparePassword = async function(candidatePassword, next){
  try{
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch; //boolean gives true or false value
  }catch(err){
    return next(err);
  }
};


//we have to then make a mongoose model
//mongoose compiles a model for us
//an instance of a model is called a document
const User = mongoose.model("User", userSchema);
module.exports = User;
