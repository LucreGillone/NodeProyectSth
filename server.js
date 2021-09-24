const express = require("express")
const router = require("./routes/index")
const session = require("express-session")
const Sequelize = require("sequelize")
const database = require("./config/database")
require("dotenv").config()
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const User = require("./models/User")
const Experience = require("./models/Experience")

Experience.belongsTo(User)
User.hasMany(Experience)

const myStore = new SequelizeStore({
    db: database
})
const linkControllers = require("./controllers/linkControllers")

const app = express()

app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: process.env.SECRET,
    store: myStore,
    resave: false, 
    saveUninitialized: false,
    proxy: true,
}))
myStore.sync()


database.sync()
.then(()=>{
    app.use("/", linkControllers.checkURL, router)
	app.listen(4000, () => console.log("Server listening"))

})