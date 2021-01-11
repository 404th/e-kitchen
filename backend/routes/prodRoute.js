const router = require("express").Router()
const { validationResult, check } = require("express-validator")
const { prod_add_post, prod_edit_patch, prod_delete_delete, prod_payload_get } = require("./controllers/prodController")
const { verifyToken } = require("./verifyToken")
// GET - /product
router.get( "/", verifyToken, prod_payload_get )

// POST - /product/add
router.post( "/add", verifyToken ,[
  check("productName", "Product name is required!").isLength({ min:1 }).trim(),
  check("productPrice", "Product price is required!").isLength({ min:1 }).trim() ,
  check("productCategory", "Product category is required!").isLength({ min:1 }).isLength({ max:1 }).trim(),
  // check("productAbout", "About product").isLength({ min:1 }).trim(),
  // check("productImage", "Product image is required!").isLength({ min:1 }).trim(),
] ,prod_add_post(validationResult) )

// PATCH - /product/edit?id
router.patch( "/edit", verifyToken ,prod_edit_patch )

// DELETE - /product/delete?id
router.delete( "/delete", verifyToken ,prod_delete_delete )

// exporting all router
module.exports = router