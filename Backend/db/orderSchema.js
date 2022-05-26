const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    
    orders:[{
  id: {
    type: Number,
  },
  pname: {
    type: String,
  },
  price: { type: Number},
  image: { type: String},
  quantity: { type: String },

  date: { type: Date, default: Date.now }}],
total: {type:Number},cardnum: { type: String },email: { type: String }});

module.exports = mongoose.model("order", orderSchema);


// const mongoose = require("mongoose");
// const orderSchema = new mongoose.Schema({
//   id: {
//     type: Number,
//   },
//   pname: {
//     type: String,
//   },
//   price: { type: Number},
//   image: { type: String},
//   quantity: { type: String },

//   date: { type: Date, default: Date.now }
// ,total: {type:Number},cardnum: { type: String }});

// module.exports = mongoose.model("order", orderSchema);
