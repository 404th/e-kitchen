const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
// Setting .env Config
const dotenv = require("dotenv")
dotenv.config({ path:`${ __dirname }/.env` })
// CONSTS from .env
const { PORT, MONGODB_URL } = process.env
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

//
const app = express()
// middlewares
app.use( cors() )
app.use( cookieParser() )
app.use( express.json() )
//
const authRoute = require("./routes/authRoute")
app.use( '/user', authRoute )


// CONNECTING SERVER PORT
app.listen( PORT, () => console.log( `SERVER is running on PORT - ${ PORT }` ) )