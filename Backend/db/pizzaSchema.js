const mongoose = require("mongoose");
const pizzaSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  pname: {
    type: String,
  },
  price: { type: Number},
  image: { type: String},

});
module.exports = mongoose.model("pizza", pizzaSchema);
