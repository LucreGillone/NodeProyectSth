const Sequelize = require("sequelize")
const database = require("../config/database")

const User = database.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
})

module.exports = User

// name: String,
//     email: String,
//     password: String,
//     src: String,
//     favs: Array,
//     admin: {type: Boolean