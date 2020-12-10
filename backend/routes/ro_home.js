const router = require("express").Router()
const { check, validationResult } = require("express-validator")
const Good = require(`${ __dirname }/../models/mo_item`)
const User = require(`${ __dirname }/../models/mo_user`)
const verifyToken = require(`${__dirname}/./verifyToken`)

// /profile/home
router.get("/home", async (req, res) => {
  try {
    res.status(200).json({ message:req.user })
  } catch(err) {
    res.status(400).json({message:"INVALID!"})
  }
} )

// /profile/items/add
router.post( "/items/add", verifyToken, [
  check( "name", "Should be inserted name of new good" ).isLength({min:1}),
  check( "price", "Should be inserted price of new good" ).isLength({min:1}),
  check( "type", "Should be selected type of new good" ).isLength({min:1}),
  check( "storeId", "Should be _id" ).isLength({min:1})
], async (req, res) => {
  const ERRORS = validationResult(req)
  if( !ERRORS.isEmpty() ){  
    return res.status(400).json({
      errors:ERRORS.array(),
      message:"Errors while validation!"
    })
  }
  try {
    const { storeId, name, price, type, good_imageURL, description } = req.body
    const user = await User.findOne({ _id:storeId })

    if( !user ){
      return res.status(404).json({ message:"User unauthorized!!!!!" })
    }

    if( !user.candidateType.includes("admin") ){
      return res.status(400).json({ message:"User is not Admin!" })
    }
    const newGood = await new Good({ storeId, name, price, type, good_imageURL, description })
    await newGood.save()
    return res.status(200).json({ newGood:newGood, message:"New item has been added to Shop!" })
  } catch (err) {
    return res.status(500).json({ message:"Some error on SERVER while adding good" })
  }
} )

// delete Good from DB
router.post( `/items/delete/:id`, verifyToken, async (req, res) => {
  
  try {
    const { storeId } = req.body
    const { id } = req.params
    
    const item = await Good.findOne({ _id:id })

    if( !item ){
      return res.status(404).json({ message:"Item did not entered!" })
    }

    if( item.storeId !== storeId ){
      return res.status(400).json({ message:"This item was not entered by this store!" })
    }

    await Good.deleteOne({ _id:id }, err => {
      if( err ) {
        return res.status(400).json({ message:"Element did not deleted!" })
      }
      return res.status(200).json({ message:"Successfully deleted!", id })
    } )

  } catch (err) {
    if( err ) {
      return res.status(500).json({ message:"Some error on SERVER!" })
    }
  }

} )

// /profile/items

router.post( "/items", verifyToken, async (req, res) => {

  try {
    // const { storeId } = req.body
    const allGoods = await Good.find({})
    res.status(200).json({ message:"Goods are ready to show!", data:allGoods })
    // console.log( allGoods )
  } catch (err) {
    return res.status(500).json({ message:"Some error on SERVER" })
  }

} )


module.exports = router



