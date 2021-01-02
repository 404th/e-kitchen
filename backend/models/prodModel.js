const mongoose = require("mongoose")


const ProdSchema = mongoose.Schema({
  productName:{
    type:String
  },
  productPrice:{
    type:Number
  },
  productAbout:{
    type:String
  },
  productCategory:{
    type:Number
  },
  productImage:{
    type:String
  }
},{ timestamps:true })

const Product = mongoose.model( "Product", ProdSchema )

module.exports = { Product }