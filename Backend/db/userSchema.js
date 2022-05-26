const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
 
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  email: { type: String, required: true,unique: true },
  mobile: { type: Number},
  password: { type: String, required: true },
  address:{type:String},
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model("user", userSchema);
