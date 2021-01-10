const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  if ( req.cookies ){
    const { userToken } = req.cookies
    if ( userToken ){
      jwt.verify( userToken, "compilation error 404", (err, decod) => {
        if (err) {
          // error: invalid verification token
          console.log("Invalid token!")
          res.redirect(`${ process.env.CLIENT_URL }/user/login`)
        } else {
          // allows to use protected routes
          next()
        }
      } )
    } else {
      // error: user has not token
      console.log( "Invalid token!" )
    }
  } else {
    console.log("User has no cookie!")
  }
}
module.exports = { verifyToken }