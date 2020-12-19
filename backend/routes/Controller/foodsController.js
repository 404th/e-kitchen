const Product = require("../../schema/foodsSchema")


// postProduct
// /products
const postProduct = valResult => async (req, res) => {
  let ERRORS = valResult( req )

  if( !ERRORS.isEmpty() ){
    return res.status( 400 ).json({
      message:"Validation errors!",
      errors: ERRORS.array()
    })
  }

  try {
    // come Info
    const { productName, productPrice, productAbout } = req.body
    const existProduct = await Product.findOne({ productName })
    if( existProduct ){
      return res.status( 400 ).json({
        message:"Such product exists!"
      })
    }

    const newProduct = await new Product({ productName, productPrice, productAbout })
    await newProduct.save()

    return res.status( 200 ).json({
      message:"New Product has been added successfully!"
    })

  } catch ( err ){
    if( err ) return res.status( 500 ).json({
      message:"Something went wrong with SERVER!"
    })
  }
}

// getFoods
// /products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
  
    return res.status( 200 ).json({
      message:"Products found!",
      data: products
    })
  } catch (err) {
    if( err ) return res.status(500).json({
      message:"Some error on the SERVER!"
    })
  }

} 

module.exports = { postProduct, getProducts }