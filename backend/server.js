const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

mongoose.Promise = global.Promise
const app = express()
app.use( cors() )
app.use( cookieParser() )
app.use( express.json() )
// app.use( express.static( __dirname + "public" ) )
// PROCESS WITH .env 
const dotenv = require("dotenv")
dotenv.config({ path:`${ __dirname }/.env` })
const MONGODB_URL = process.env.MONGODB_URL
const PORT = process.env.PORT || 3131

// CONNECT MONGODB AND AFTER IT STARTING SERVER ASYNC
const startServer = async () => {
  await mongoose.connect( MONGODB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  }, err => {
    if (err) console.log( err )
    console.log("MONGODB connected!")
    app.listen( PORT, () => console.log(`SERVER has been running on PORT : ${ PORT }`) )
  } )
}
startServer()

// ROUTERS
const foodsRoute = require(`${__dirname}/routes/foodsRoute`)
const userRoute = require(`${ __dirname }/routes/userRoute`)
app.use( "", foodsRoute )
app.use( "/user", userRoute )




