// const { validationResult } = require('express-validator')

// postFoods
const postFoods = validationResult => ( async (req, res) => {
  let ERRORS = validationResult( req )

  if( !ERRORS.isEmpty() ){
    return res.status( 400 ).json({
      message:"Validation errors!",
      errors: ERRORS.array()
    })
  }

  try {    
    const foodBody = req.foodBody
    res.status(200).json({
      message:"OK",
      body: foodBody
    })

  } catch ( err ){
    if( err ) return res.status( 500 ).json({
      message:"Something went wrong with SERVER!"
    })
  }

})


// getFoods
// const getFoods = (req, res) => {
  
// }

module.exports = { postFoods }