const jwt = require("jsonwebtoken")

// GET NEW TOKEN
function getToken (id) {
  jwt.sign(
    { id },
    17,
    { expiresIn: 60 * 60 * 24 * 3 }
  )
} // for 3 days

module.exports = { getToken }




