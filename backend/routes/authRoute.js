const router = require("express").Router()
const { check, validationResult } = require("express-validator")
const { verifyToken } = require("./verifyToken")
const {
  auth_signup_post,
  auth_login_post,
  auth_edit_patch,
  auth_delete_delete,
  auth_payload_get,
  auth_logout_get,
  auth_isLogged_get
} = require("./controllers/authController")

// GET - /user
router.get( "/", verifyToken, auth_payload_get )

// PATCH - /user/edit/:id
router.patch( "/edit/:id", verifyToken, auth_edit_patch )

// DELETE - /user/delete/:id
router.delete( "/delete/:id", verifyToken, auth_delete_delete )

// POST - /user/signup
router.post( "/signup",[
  check("username", "Should be more than 3").isLength({min:3}),
  check("email", "Enter valid email").isEmail(),
  check("password", "Should be more than 4").isLength({ min:4 })
],auth_signup_post( validationResult ) )

// POST - /user/login
router.post( "/login", [
  check("email", "Enter valid email!").isEmail(),
  check("password", "Should be more than 4").isLength({ min:4 })
], auth_login_post( validationResult ) )

// GET - /user/logout
router.get( "/logout", auth_logout_get )

// GET - /user/is-logged
router.get( "/is-logged", auth_isLogged_get )

// export routers
module.exports = router