const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
  address:{
    type:{ String }
  },
  order:{
    type:{ String }
  }
})

const Order = mongoose.model( 'Order', orderSchema )

module.exports = { Order }