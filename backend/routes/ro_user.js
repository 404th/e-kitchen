const router = require("express").Router()
const User = require(`${__dirname}/../models/mo_user.js`)
const { check, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const verifyToken = require("./verifyToken")

router.get( "/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById( req.user.candidateId )
    if( user ){
      return res.status(200).json({message:user})
    }
    res.status(403).json({message:"User not found!"})
  } catch (err) {
    return res.status(400).json({message:"User unauthorized!"})
  }
} )

// Edit profile settings
router.patch( "/profile/:id", verifyToken,[
  check( 'firstname', "Should be more than 3 sym" ).isLength({min:3}),
  check( 'username', "Should be more than 3 sym" ).isLength({min:3}),
  check( 'email', "Enter valid Email!" ).isEmail(),
  check( 'password', "Password must be longer than 6 symbols" ).isLength({min:6})
], async (req, res) => {
  const ERRORS =  validationResult(req)
  if( !ERRORS.isEmpty() ){
    return res.status(400).json({
      errors:ERRORS.array(),
      message:"Wrong edit!"
    })
  }

  try {
    const user = await User.findById( req.user.candidateId )
    if(!user){
      return res.status(403).json({message:"User not found!"})
    }
    const { id } = req.params
    const { candidateId } = req.user
    const settedObj = { ...req.body }
    if( id !== candidateId ){
      return res.status(401).json({message:"Token is invalid after come DB!"})
    }
    const result = await User.findByIdAndUpdate( id, {...settedObj}, {new: true} )

    const token = jwt.sign(
      { candidateId: result._id },
      process.env.JWT_SECRET
    )
    return res.header("candidate_token", token).json({message:token, data:result})
  } catch (err) {
    return res.status(406).json({error:err})
  }
} )

//        /api/auth/register
router.post( "/register",[
  check( 'username', "Should be more than 3 sym" ).isLength({min:3}),
  check( 'firstname', "Should be more than 3 sym" ).isLength({min:3}),
  check( 'email', "Enter valid Email!" ).isEmail(),
  check( 'password', "Password must be longer than 6 symbols" ).isLength({min:6})
],async (req, res) => {

  try {
    // Sending ERRORS if validation has one
    const ERRORS = validationResult(req)
    if( !ERRORS.isEmpty() ){
      return res.status(400).json({
        errors:ERRORS.array(),
        message:"Errors on reg process"
      })
    }
    // Checking for if user was registered
    const { firstname, username, email, password } = req.body
    const candidateType = [ "user" ]

    // Sending error if the email exists
    const candidate = await User.findOne({email})
    if( candidate ){
      return res.status(400).json({message:"This email was registered!"})
    }
    const { CREATOR_DATA_firstname, CREATOR_DATA_username, CREATOR_DATA_email, CREATOR_DATA_password } = process.env

    if(
        firstname === CREATOR_DATA_firstname,
        username===CREATOR_DATA_username,
        email===CREATOR_DATA_email,
        CREATOR_DATA_password===password
      ){
      candidateType.push("creator")
    }
    
    // Sending data to DB if email does not exist
    const user = await new User({ firstname, username, email, password, candidateType })
    await user.save()
    return res.status(201).json({message:"User has been registrated!"})

  } catch (err) {
    // Sending error if SERVER is not responding
    return res.status(500).json({message:"Some error on SERVER!"})
  }

} )

// /api/auth/login
router.post( "/login",[
  check("email", "Enter valid email!" ).isEmail(),
  check("password", "Password must be longer than 6 or equal!").isLength({min:6})
],async (req, res) => {
  const ERRORS = validationResult(req)
  if( !ERRORS.isEmpty() ){
    return res.status(400).json({ errors:ERRORS.array() })
  }

  try {
    const { email, password } = req.body
    const user = await User.findOne({ email, password })
    if( !user ){
      return res.status(401).json({errors:"User unauthorized!" })
    }
    const token = jwt.sign(
      { candidateId: user._id },
      process.env.JWT_SECRET
    )
    return res.header("candidate_token", token).json({ message:token, data:user })
  } catch (err) {
    return res.status(500).json({message:err.response})
  }

} )
//  Exporting routes to server.js
module.exports = router





