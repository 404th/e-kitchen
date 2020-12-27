const User = require(`../../schema/userSchema`)

const { getToken } = require("../jwt")
// postUser
const postUser = validationResults => async (req, res) => {
  try {
    let ERRORS = validationResults(req)
    if ( !ERRORS.isEmpty() ){
      return res.status( 400 ).json({
        message:"Validation error",
        errors: ERRORS
      })
    }

    let {
      signupUsername,
      signupEmail,
      signupPhone,
      signupPassword,
    } = req.body
    // Save new user
    let newUser = await User.create({
      username: signupUsername,
      email: signupEmail,
      phone: signupPhone,
      password: signupPassword
    })
    // get token and save it in cookie
    let token = getToken( newUser._id )
    await res.cookie( "jwt", token, { maxAge: 86400000*3, httpOnly: true } )
    return res.status(201).json({
      message:"User saved!",
      data: newUser._id
    })
  } catch (err) {
    if (err) {
      return res.json({
        message:"ERROR",
        errors: err
      })
    }
  }

}

module.exports = { postUser }