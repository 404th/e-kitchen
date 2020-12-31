const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = Schema({
  username:{
    type: String,
  },
  email:{
    type: String,
  },
  password:{
    type: String,
  }
},{
  timestamps:true
})

// hash new user's password
UserSchema.pre("save", async function( next ){
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash( this.password, salt )
  this.password = hashedPassword
  next()
})

const User = model("User", UserSchema)
module.exports = { User }