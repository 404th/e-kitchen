const User = require(`../../schema/userSchema`)
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

    let newUser = await new User({
      username:signupUsername,
      email:signupEmail,
      phone:signupPhone,
      password:signupPassword
    })
    let savedUser = await newUser.save()
    return res.status(200).json({
      message:"User saved!",
      data:savedUser
    })

  } catch (err) {
    if( err ) return res.status(500).json({
      message:"SERVER FAILED while posting User!",
      errors: err
    })
  }

}
module.exports = { postUser }