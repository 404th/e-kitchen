const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config({path:`${__dirname}/.env`})
const path = require("path")

const app = express()
mongoose.Promise = global.Promise
app.use(express.static(path.join(__dirname, 'build')));

//Connecting to Mongodb
const { DB_ADD, PORT = 3333 } = process.env

async function startServer(){
  try {
    mongoose.connect( DB_ADD,{
      useCreateIndex:true,
      useNewUrlParser:true,
      useUnifiedTopology:true,
      useFindAndModify:false
    }, () => { console.log("MongoDB connected successfully!") } )
  } catch (err) {
    console.log("Something is running wrong while connecting to DB!")
    process.exit(1)
  }
}
startServer()

app.use( cors() )
app.use( express.static(`${__dirname}/../public`) )
app.use( express.json() )
//////////////////////////
//SIGN UP
const userRouter = require(`${__dirname}/routes/ro_user.js`)
const profileRouter = require(`${__dirname}/routes/ro_home.js`)
const storeRouter = require(`${__dirname}/routes/ro_store.js`)

app.use( "/api/auth", userRouter )
app.use( "/profile", profileRouter )
app.use( "/stores", storeRouter )

app.listen( PORT, console.log(`Server is running on port: ${ PORT }`) )