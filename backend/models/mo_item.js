const mongoose = require("mongoose")


const goodSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  price:{
    type:String,
    required:true
  },
  type:{
    type:String,
    required:true
  },
  good_imageURL:{
    type:String,
    required:false
  },
  storeId:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:false
  }
})

const Good = mongoose.model( "Good", goodSchema )

module.exports = Good