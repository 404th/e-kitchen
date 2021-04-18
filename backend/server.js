const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
// Setting .env Config
const dotenv = require("dotenv")
dotenv.config({ path:`${ __dirname }/.env` })
// consts from .env
const { PORT = 5000, MONGODB_URL } = process.env
mongoose.Promise = global.Promise
// SET to MongoDB
mongoose.connect( MONGODB_URL, {
  useCreateIndex:true,
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:false
}, err => {
  if ( err ) {
    console.log("Error while connecting to MongoDB")
  } else {
    console.log("Successfully connected to MongoDB!")
  }
} )
// getting express server
const app = express()
// middlewares
app.use( cors() )
app.use( express.json() )
app.use( cookieParser() )
// routers
const authRoute = require("./routes/authRoute")
app.use( '/user', authRoute )
const prodRoute = require("./routes/prodRoute")
app.use( '/product', prodRoute )
const orderRoute = require("./routes/orderRoute")
app.use( '/order', orderRoute )

// listening server
app.listen( PORT, () => console.log( `SERVER is running on PORT - ${ PORT }` ) )