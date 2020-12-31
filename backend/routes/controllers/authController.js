const { User } = require("../../models/userModel")
const bcrypt = require("bcrypt")

// SIGN UP - POST
const auth_signup_post = valResult => async (req, res) => {
  const ERRORS = valResult(req)
  if( !ERRORS.isEmpty() ){
    return res.status( 400 ).json({
      message:"Validation errors",
      data:ERRORS
    })
  }

  try {
    let { username, email, password } = req.body
    // check if user exists or not in DB
    let existUser = await User.findOne({ username, email })
    if( existUser ){
      return res.status( 409 ).json({
        message:"User already signed up!",
        data: new Error("These email and password already signed up!")
      })
    }
    // sign up new User
    let savedUser = await User.create({ username, email, password })
    // if user saved response about it
    if( savedUser ){
      return res.status( 201 ).json({
        message:"User signed up!",
        data:savedUser._id
      })
    }
    // catching error data sent but not get res from DB
    return res.status( 500 ).json({
      message:"User not signed up!",
      data: new Error("User data not saved!")
    })
  } catch (err) {
    // catching SERVER error
    if( err ) return res.status( 500 ).json({
      message:"Server Internal Error while signed up!",
      data:err
    })
  }
}

// LOG IN - POST
const auth_login_post = valResult => async (req, res) => {
  //checking validation results
  const ERRORS = valResult(req)
  if( !ERRORS.isEmpty() ){
    return res.status(400).json({
      message:"Errors while validation",
      data:ERRORS
    })
  }

  try {
    const { username, password } = req.body
    // check if user exist or not
    let existUser = await User.findOne({ username })
    if( existUser ){
      let match = await bcrypt.compare( password, existUser.password )
      if( match ){
        return res.status( 200 ).json({
          message:"User login!",
          data:existUser._id
        })
      } else {
        return res.status( 401 ).json({
          message:"Password is wrong!",
          data: new Error("User password is not match!")
        })
      }
    }

    return res.status( 404 ).json({
      message:"Username not found!",
      data: new Error("User not found!")
    })

  } catch( err ) {
    if( err ) return res.status(500).json({
      message:"SERVER POINT ERROR WHILE LOGIN",
      data:err
    })
  }

}

module.exports = { auth_login_post, auth_signup_post }