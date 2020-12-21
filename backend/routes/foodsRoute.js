const router = require("express").Router()
const { check, validationResult } = require('express-validator')
//
const { postProduct, getProducts, patchProduct, deleteProduct } = require(`${ __dirname }/Controller/foodsController`)

router.get( "/products", getProducts )
router.post( "/delete-product/:id", deleteProduct )
router.post( "/products",[
  check( "productName", "Should be write down name of Product name" ).isLength({ min:1 }),
  check( "productPrice", "Should be written price of Product" ).isLength({ min:1 }),
  check( "productCategory", "Should be selected category of Product" ).isLength({ min:1 })
] ,postProduct( validationResult ) )
router.patch( "/edit-product/:id",[
  check( "newProductName", "Should be write down name of Product name" ).isLength({ min:1 }),
  check( "newProductPrice", "Should be written price of Product" ).isLength({ min:1 }),
  check( "newProductCategory", "Should be selected category of Product" ).isLength({ min:1 })
] ,patchProduct( validationResult ) )

module.exports = router