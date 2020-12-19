const mongoose = require("mongoose")

const FoodsSchema = mongoose.Schema({
  foodName:{
    type: String,
    required: true,
    unique: true
  },
  foodPrice:{
    type: Number,
    required: true
  },
  
}, { timestamps: true })

const Food = mongoose.model( "Product", FoodsSchema )

module.exports = Food