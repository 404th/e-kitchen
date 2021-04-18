const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  if ( req.body ){
    const { userToken } = req.body

    if ( userToken ){
      console.log( userToken )
      jwt.verify( userToken, "compilation error 404", (err, decod) => {
        if (err) {
          // error: invalid verification token
          return res.status(200).json({
            message:"Invalid token!",
            data:{
              isLogged: false
            }
          })
        } else {
          // allows to use protected routes
          next()
        }
      } )
    } else {
      console.log( "userToken not found" )
      // error: user has not token
      return res.status(200).json({
        message:"User has no token!",
        data:{
          isLogged: false
        }
      })
    }
  } else {
    // cookie not found
    return res.status(200).json({
      message:"User has no cookie or browser might have been detected to save cookies!",
      data:{
        isLogged: false
      }
    })
  }
}
module.exports = { verifyToken }