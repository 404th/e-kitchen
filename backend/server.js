const mongoose = require("mongoose")
const express = require("express")
const app = express()
app.use( express.json() )
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
app.use( "", foodsRoute )



