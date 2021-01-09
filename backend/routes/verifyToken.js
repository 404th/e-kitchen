const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  if ( req.cookies ){
    const { userToken } = req.cookies
    if ( userToken ){
      jwt.verify( userToken, "compilation error 404", (err, decod) => {
        if (err) {
          // error: invalid verification token
          console.log(err)
          // res.redirect("/user/login")
        } else {
          // allows to use protected routes
          console.log( decod )
          next()
        }
      } )
    } else {
      // error: user has not token
      res.redirect(`${ process.env.CLIENT_URL }/user/login`)
    }
  } else {
    console.log("User has no cookie!")
    res.redirect(`${ process.env.CLIENT_URL }/user/login`)
  }
}
module.exports = { verifyToken }