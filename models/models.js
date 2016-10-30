let mongoose = require('mongoose');

// Create Cat Schema
let Cat = mongoose.Schema({
  name: String,
  age: Number,
  colors: [String],
  price: Number
});


let models =  {
  Cat : mongoose.model("cat", Cat)
}

module.exports = models;