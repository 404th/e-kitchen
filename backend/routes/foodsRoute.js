const router = require("express").Router()
const { check, validationResult } = require('express-validator')
//
const { postProduct, getProducts } = require(`${ __dirname }/Controller/foodsController`)

router.get( "/products", getProducts )
router.post( "/products",[
  check( "productName", "Should be write down name of Product name" ).isLength({ min:1 }),
  check( "productPrice", "Should be written price of Product" ).isLength({ min:1 })
] ,postProduct( validationResult ) )

module.exports = router