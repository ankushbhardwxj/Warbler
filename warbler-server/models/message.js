const mongoose = require("mongoose");
//we bring in user model because we want to relate every message
//to its corresponding user
const User = require("./user");
//make schema for the messages
const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxLength: 160
  },
  //used like foreign key to relate two models
  user: {
    type: mongoose.Schema.Types.ObjectId, //used to match message to id of the user
    ref: "User"  //this should refer to the model name of user.js
  }
},
{
  timestamps: true
});

messageSchema.pre('remove', async function(next){
  //find a user
  //remove the id of the message from their messages list
  //save that username
  //return next
  try{
    let user = await User.findById(this.user);
    //remove the id from the list
    user.messages.remove(this.id);
    //save that userId
    await user.save();
    //return next
    return next();
  }catch(err){
    return next(err);
  }
})
const Message = mongoose.model("Message",messageSchema);
module.exports = Message;
