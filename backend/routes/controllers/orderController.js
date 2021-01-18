


const order_buy_post = valResult => async (req, res) => {

  const ERRORS = valResult(req)
  if ( !ERRORS.isEmpty() ){
    return res.status(400).json({
      message:"Validation error!",
      data: ERRORS
    })
  }

  try {

    const { address, order } = req.body

    console.log( address )
    console.log( order )

  } catch (err) {
    if (err){
      return res.status(500).json({
        message:"Internal SERVER error!",
        data:err
      })
    }
  }

}


module.exports = {
  order_buy_post
}