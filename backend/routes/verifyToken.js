const jwt = require("jsonwebtoken")

async function verifyToken (req, res, next){

    const userToken = req.header("candidate_token")
    
    if(!userToken) return res.status(401).json({message:"User has not Token!"})

    try {
      const verified = jwt.verify( userToken, process.env.JWT_SECRET )
      req.user = verified
      next()
    } catch(err) {
      res.status(400).json({message:"Invalid token!"})
    }

}

module.exports = verifyToken
