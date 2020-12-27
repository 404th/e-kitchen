const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

var UserSchema = mongoose.Schema({
  username:{
    type: String,
  },
  email:{
    type: String,
  },
  phone:{
    type: Number,
  },
  password:{
    type: String,
  }
}, { timestamps:true } )

UserSchema.pre( "save", async function( next ){
  let salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash( this.password, salt )
  next()
} )

const User = mongoose.model("User", UserSchema )
module.exports = User

