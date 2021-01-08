const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  if ( req.cookie ){
    console.log( req.cookie )
    const { userToken } = req.cookie
    if ( userToken ){
      jwt.verify( userToken, "compilation error 404", (err, decod) => {
        if (err) {
          // error: invalid verification token
          console.log(err)
          res.redirect("/user/login")
        } else {
          // allows to use protected routes
          console.log( decod )
          next()
        }
      } )
    } else {
      // error: user has not token
      res.redirect("/user/login")
    }
  } else {
    console.log("User has no cookie!")
    res.redirect('/user/login')
  }
}
module.exports = { verifyToken }