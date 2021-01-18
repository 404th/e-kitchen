
const router = require("express").Router()
const { verifyToken } = require("./verifyToken")
const { validationResult, check } = require('express-validator')

const {
  order_buy_post
} = require( './controllers/orderController' )

// POST - /order/buy
router.post( '/buy', [
  check( 'address.name', 'Who will accept the order?' ).isLength({ min:1 }),
  check( 'address.address1', 'Streetname is requied.' ).isLength({ min:1 }),
  check( 'address.address2', 'Home/Flat name are required.' ).isLength({ min:1 }),
  check( 'address.city', 'City is required.' ).isLength({ min:1 }),
], order_buy_post( validationResult ) )

module.exports = router