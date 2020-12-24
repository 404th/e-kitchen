const User = require(`../../schema/userSchema`)
const { getToken } = require("../jwt")
// postUser
const postUser = validationResults => async (req, res) => {

  let ERRORS = validationResults(req)
  if( !ERRORS.isEmpty() ){
    return res.status(401).json({
      message:"Validation ERRORS!",
      errors:ERRORS
    })
  }
  try {
    let {
      signupUsername,
      signupEmail,
      signupPhone,
      signupPassword
    } = req.body

    let savedUser = await User.create({
      username:signupUsername,
      email:signupEmail,
      phone:signupPhone,
      password:signupPassword
    })
    // GET TOKEN AND WORKS WITH IT
    const token = await getToken( savedUser._id )
    await res.cookie( 'jwt_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 3,
    } ) // for 3 days

    return res.status(200).json({
      message:"User saved!",
      data: savedUser
    })
  } catch (err) {
    if( err ) return res.status(500).json({
      message:"FAILED while posting User!",
      errors: err
    })
  }
}
module.exports = { postUser }