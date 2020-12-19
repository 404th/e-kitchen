const router = require("express").Router()
const { check, validationResult } = require('express-validator')
//
const { postProduct, getProducts, patchProduct } = require(`${ __dirname }/Controller/foodsController`)

router.get( "/products", getProducts )
router.post( "/products",[
  check( "productName", "Should be write down name of Product name" ).isLength({ min:1 }),
  check( "productPrice", "Should be written price of Product" ).isLength({ min:1 })
] ,postProduct( validationResult ) )
router.patch( "/edit-product/:id",[
  check( "productName", "Should be write down name of Product name" ).isLength({ min:0 }),
  check( "productPrice", "Should be written price of Product" ).isLength({ min:0 })
] ,patchProduct( validationResult ) )

module.exports = router