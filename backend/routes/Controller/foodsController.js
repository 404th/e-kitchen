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
      message:"Something went wrong with our SERVER!"
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

// patchFoods
const patchProduct = valResult => async ( req, res ) => {

  const ERRORS = valResult( req )
  if( !ERRORS.isEmpty() ){
    return res.status( 400 ).json({
      message:"Validation errors!",
      errors: ERRORS
    })
  }

  let { id } = req.params
  
  let chosenProduct = await Product.findById( id )
  if( !chosenProduct ){
    return res.status( 404 ).json({
      message:"Product not found!"
    })
  }

  try {
    let { productName, productPrice, productAbout } = req.body
    console.log( req.body )
    let editedProduct = () => {
      let obj = {}
      // ProductName is inserted or no
      if ( productName !== undefined ){
        obj.productName = productName
      } else {
        obj.productName = chosenProduct.productName
      }
      // ProductPrice is inserted or no
      if ( productPrice !== undefined ){
        obj.productPrice = productPrice
      } else {
        obj.productPrice = chosenProduct.productPrice
      }
      // ProductAbout is inserted or no
      if ( productAbout !== undefined ){
        obj.productAbout = productAbout
      } else {
        obj.productAbout = chosenProduct.productAbout
      }
      return obj
    }
    
    const editedItem = await editedProduct()
    console.log( editedItem )

    await editedItem.save()
    return res.status( 200 ).json({
      message:"Product edited!",
      data: editedItem
    })
  } catch (err) {
    if( err ) return res.status( 500 ).json({
      message:"Some error on SERVER!",
      error:err
    })
  }

}

module.exports = { postProduct, getProducts, patchProduct }