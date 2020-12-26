const router = require("express").Router()
const { postUser } = require(`${__dirname}/Controller/userController`)
const { check, validationResult } = require("express-validator")

// post ==> /user/signup
router.post( "/signup",[
  check("signupUsername", "Should be write down USERNAME").isLength({min:1}),
  check("signupEmail", "Should be write down EMAIL").isLength({min:1}).isEmail(),
  check("signupPhone", "Should be write down PHONE").isLength({min:1}).isMobilePhone(),
  check("signupPassword", "Should be write down PASSWORD").isLength({min:1}),
],postUser( validationResult ) )

module.exports = router