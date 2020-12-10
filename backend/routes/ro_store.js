
const router = require("express").Router()
const verifyToken = require("./verifyToken")
const User = require( `${__dirname}/../models/mo_user` )
const Good = require( `${__dirname}/../models/mo_item` )

// /stores/list
router.get( "/list", verifyToken, async (req, res) => {

  try {
    const allUsers = await User.find({})
    if( !allUsers ){
      return res.status( 404 ).json({ message:"Not found!" })
    }
    return res.status( 200 ).json({ message: "Users found", data:allUsers })
  } catch (err) {
    if( err ){
      return res.status(500).json({ message:"Some error on Server!" })
    }
  }

}  )

// /stores/add

router.patch( "/add", verifyToken, async (req, res) => {

  try {
    const { storeId } = req.body
    const addedUser = await User.findOne( {_id:storeId} )
    if( !addedUser ){
      return res.status(404).json({ message:"User not found!" })
    }
    User.updateOne( { _id:storeId }, { $push:{ candidateType: "admin" } }, ( err, docs ) => {
      if( err ) {
        return res.status(500).json({ message:"Some error while updating!" })
      }
      return res.status(200).json({ message:docs })
    } )
  } catch ( err ) {
    return res.status(500).json({ error:err, message:"Some error on SERVER!" })
  }
} )

// /stores/remove

router.patch( "/remove", verifyToken, async (req, res) => {
  try {
    const { storeId } = req.body
    const removedStore = await User.findOne({ _id:storeId })
    const deletedGoods = await Good.find({ storeId })
    // console.log( deletedGoods )
    if( !removedStore ){
      res.status(404).json({ message:"User not fount in DB!" })
    }

    User.updateOne({ _id:storeId }, { $pull: { candidateType: "admin" } }, async (err, docs) => {
      if( err ) {
        res.status(500).json({ message:"Some error while removing store!" })
      }
      if( deletedGoods ){
        await Good.deleteMany( { storeId }, (err,) => {
          if( err ){
            return res.status(400).json({ message:"Error while removed GOODS" })
          }
        } )
      }
      res.status(200).json({ message:docs })
    })

  } catch (err) {
    res.status(500).json({ message:"Some error on SERVER!" })
  }
} )

module.exports = router