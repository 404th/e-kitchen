const router = require("express").Router()
const { check, validationResult } = require('express-validator')

//
const { postFoods } = require(`${ __dirname }/Controller/foodsController`)

// router.get( "/foods", getFoods )

router.post( "/foods" ,[
  check( "foodName", "Should be write down name of Product name" ).isLength({ min:1 }),
  check( "foodPrice", "Should be written price of Product" ).isLenght({ min:1 })
], (validationResult) => { postFoods( validationResult ) } )


module.exports = router