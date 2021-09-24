const Sequelize = require("sequelize")
const database = new Sequelize("something", "root", "", {
    host: "localhost", 
    dialect: "mysql"
})

module.exports = database