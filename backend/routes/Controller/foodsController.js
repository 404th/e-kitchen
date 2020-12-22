const Product = require("../../schema/foodsSchema")
var mongodb = require('mongodb');

// deleteProduct
const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    let existProd = await Product.findOne({_id:id})
    if( !existProd ){
      return res.status( 404 ).json({
        message:"Product is not found!"
      })
    }

    await Product.deleteOne({_id: new mongodb.ObjectID( id.toString() )}, function(err, results) {
      if (err){
        return res.status( 400 ).json({ message:"Could not delete item!", errors:err })
      }
      return res.status( 200 ).json({ message:"Product deleted!" })
   });

  } catch (err) {
    if( err ) return res.status( 500 ).json({ message:"Error on SERVER!", errors:err })
  }

} 

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
    const { productName, productPrice, productAbout, productCategory } = req.body
    const existProduct = await Product.findOne({ productName })
    if( existProduct ){
      return res.status( 400 ).json({
        message:"Such product exists!"
      })
    }
    const newProduct = await new Product({ productName, productPrice, productAbout, productCategory })
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
  // Checking validation results
  const ERRORS = valResult( req )
  if( !ERRORS.isEmpty() ){
    return res.status( 400 ).json({
      message:"Validation errors!",
      errors: ERRORS.array()
    })
  }

  try {
    const { id } = req.params
    const { newProductName, newProductPrice, newProductAbout, newProductCategory } = req.body

    const existProduct = await Product.findOne({ _id:id })
    if( !existProduct ){
      return res.status( 400 ).json({
        message:"Such product doesn't exist!"
      })
    }

    let resp = await Product.findOneAndUpdate({ _id: id }, { $set:{
      productName: newProductName,
      productPrice: newProductPrice,
      productAbout: newProductAbout,
      productCategory: newProductCategory,
    } })

    return res.status( 200 ).json({
      message:"Product edited successfully!",
      data: resp
    })
  } catch ( err ) {
    return res.status( 500 ).json({
      message:"Error on SERVER!",
      errors:err
    })
  }

}

module.exports = { postProduct, getProducts, patchProduct, deleteProduct }