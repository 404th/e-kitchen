const jwt = require("jsonwebtoken")

let secret = process.env.SECRET_WORD_FOR_TOKEN
// GET NEW TOKEN
function getToken (id) {
  let newToken = jwt.sign( { id }, secret, { expiresIn: "3d" } )
  return newToken
} // for 3 days

module.exports = { getToken }

