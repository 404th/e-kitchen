const { Product } = require("../../models/prodModel")
const { ObjectId } = require("mongodb")

// GET - /product
const prod_payload_get = async (req, res) => {
  try {
    // find all products to send front
    let products = await Product.find()
    if ( products ){
      return res.status(200).json({
        message:"Found products!",
        data:products.reverse()
      })
    }
    // send data but resp is not exist
    return res.status(200).json({
      message:"There are not products!"
    })

  } catch (err) {
    // catch error if SERVER does not work properly while getting
    return res.status(500).json({
      message:"Server doesn't work properly while getting products",
      data:err
    })
  }
}

// POST - /product/add
const prod_add_post = valResult => async (req, res) => {
  const ERRORS = valResult( req )
  if( !ERRORS.isEmpty() ){
    return res.status( 400 ).json({
      message:"Validation message",
      data:ERRORS
    })
  }

  try {
    let { productName, productPrice, productCategory, } = req.body
    // Checking product not exist in DB 
    let existProduct = await Product.findOne({ productName, productPrice, productCategory })
    if( existProduct ){
      return res.status( 409 ).json({
        message:"Product has already added!",
        data:{
          errors:[ { param:"productName", msg:"Product has already added!" } ]
        }
      })
    }

    // Run this code when everthing is OK
    let savedProduct = Product.create({ ...req.body })
    if( savedProduct ){
      return res.status( 200 ).json({
        message:"Product has been added successfully to the list!",
        data:{
          productName:savedProduct.productName,
          id:savedProduct._id
        }
      })
    }
    // Run this side when user send to db,but not got data
    return res.status().json({
      message:"Product not added!",
      data:{
        errors:[
          {
            param:"productName",
            msg:"This product not saved because of the Server Internal errors!",
          }
        ]
      }
    })

  } catch (err) {
    // Error with SERVER
    if( err ){
      return res.status( 500 ).json({
        message:"Server Internal error while adding new product!",
        data:err
      })
    }
  }

}

// PATCH - /product/edit?id
const prod_edit_patch = async (req, res) => {
  try {
    const { id } = req.query
    // Check if Product exist
    const existProduct = await Product.findById( new ObjectId( id ) )
    if( existProduct ){
      // Update the product
      let updatedStuff = {}
      for ( let key in req.body ) {
        if ( req.body[ key ] !== "" ){
          updatedStuff[key] = req.body[ key ]
        } else {
          continue
        }
      }
      //
      const updatedProduct = await Product.updateOne(
        { _id: new ObjectId( id.toString() ) },
        { $set:{ ...updatedStuff } },
        { upsert: true }
      )
      // check after updating
      if( updatedProduct ){
        return res.status( 200 ).json({
          message:"Product updated!",
          data:{
            updatedProductName: updatedProduct.name,
            id:updatedProduct._id
          }
        })
      }
      // if user data sent but not get request!
      return res.status( 500 ).json({
        message:"Product data sent but not updated! Try again!"
      })
    }
    // If Product is not found in MongoDB
    return res.status( 500 ).json({
      message:"Product not found in the List!"
    })
  } catch (err) {
    if( err ){
      return res.status(500).json({
        message:"Internal Error on Server!",
        data:err
      })
    }
  }
}

// DELETE - /product/delete?id
const prod_delete_delete = async (req, res) => {
  try {
    // catcing deleted product id
    const { id } = req.query

    if ( id ) {
      // check if product exists
      let existProd = await Product.findById( id )
      if( existProd ){
        // checking delete product
        let deletedProd = await Product.findByIdAndDelete( id )
        if( deletedProd ){
          return res.status( 200 ).json({
            message:"Product deleted!",
            data:{
              deletedProductName: deletedProd.productName,
              deletedProductId: deletedProd._id
            }
          })
        }
        // delete req sent to server but response didn't get
        return res.status(500).json({
          message:"Delete req sent but not get response from SERVER!"
        })
      }
      // catching error if product not found
      return res.status.json({
        message:"Product not exist in the list!"
      })
    }
    // when id is not set to location throw this error
    return res.status(400).json({
      message:"Id not found!"
    })
  } catch (err) {
    // throw this error when SERVER does not work properly
    if( err ){
      return res.status(500).json({
        message:"Server error while deleting!",
        data:err
      })
    }
  } 

}

// export controllers
module.exports = { prod_add_post, prod_edit_patch, prod_delete_delete, prod_payload_get }