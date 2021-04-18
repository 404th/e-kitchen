const router = require("express").Router()
const { validationResult, check } = require("express-validator")
const { verifyToken } = require("./verifyToken")
const {
  prod_add_post,
  prod_edit_patch,
  prod_delete_delete,
  prod_payload_get,
  prod_like_post,
  prod_basket_post,
  prod_basket_payload_get
} = require("./controllers/prodController")
// GET - /product
// router.get( "/", verifyToken, prod_payload_get )
router.get( "/", prod_payload_get )

// POST - /product/add
router.post( "/add", [
  check("productName", "Product name is required!").isLength({ min:1 }).trim(),
  check("productPrice", "Product price is required!").isLength({ min:1 }).trim() ,
  check("productCategory", "Product category is required!").isLength({ min:1 }).isLength({ max:1 }).trim(),
  // check("productAbout", "About product").isLength({ min:1 }).trim(),
  // check("productImage", "Product image is required!").isLength({ min:1 }).trim(),
], prod_add_post(validationResult) )
// router.post( "/add", verifyToken, [
//   check("productName", "Product name is required!").isLength({ min:1 }).trim(),
//   check("productPrice", "Product price is required!").isLength({ min:1 }).trim() ,
//   check("productCategory", "Product category is required!").isLength({ min:1 }).isLength({ max:1 }).trim(),
//   // check("productAbout", "About product").isLength({ min:1 }).trim(),
//   // check("productImage", "Product image is required!").isLength({ min:1 }).trim(),
// ], prod_add_post(validationResult) )

// PATCH - /product/edit?id
// router.patch( "/edit", verifyToken, prod_edit_patch )
router.patch( "/edit", prod_edit_patch )

// DELETE - /product/delete?id
// router.delete( "/delete", verifyToken, prod_delete_delete )
router.delete( "/delete", prod_delete_delete )

// POST - /product/like?id
// router.post( "/like", verifyToken, prod_like_post )
router.post( "/like", prod_like_post )

// POST - /product/basket?user_id&prod_id
router.post( "/basket", prod_basket_post )

// GET - /product/basket/payload?user_id
router.get( "/basket/payload", prod_basket_payload_get )

// exporting all router
module.exports = router