const router = require("express").Router()
const { check, validationResult } = require("express-validator")
const { auth_signup_post, auth_login_post } = require("./controllers/authController")

// POST - /user/signup
router.post( "/signup",[
  check("username", "Should be more than 3").isLength({min:3}),
  check("email", "Enter valid email").isEmail(),
  check("password", "Should be more than 4").isLength({ min:4 })
],auth_signup_post( validationResult ) )

// POST - /user/login
router.post( "/login", [
  check("username", "Should be more than 3").isLength({min:3}),
  check("password", "Should be more than 4").isLength({ min:4 })
], auth_login_post( validationResult ) )

// export routers
module.exports = router