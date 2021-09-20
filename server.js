const express = require("express")
const router = require("./routes/index")
const session = require("express-session")
const mongo = require("connect-mongodb-session")(session)
require("dotenv").config()
const linkControllers = require("./controllers/linkControllers")
const myStore = new mongo({
   uri: process.env.MONGODB,
   collection: "sessions",
})
require ("./config/database")

const app = express()

app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: process.env.SECRET,
    resave: false, 
    saveUninitialized: false,
    store: myStore
}))
app.use("/", linkControllers.checkURL, router)

app.listen(process.env.PORT, process.env.HOST || '0.0.0.0', () => console.log("Server listening"))