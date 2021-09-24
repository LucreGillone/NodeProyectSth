const Sequelize = require("sequelize")
const database = require("../config/database")

const Experience = database.define("experience", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        allowNull: false, 
        primaryKey: true,
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

module.exports = Experience



// const experienceSchema = new mongoose.Schema({
//     title: String, 
//     description: String, 
//     url: String, 
//     likes: Array, 
//     price: String,
//     userId: {type: mongoose.Types.ObjectId, ref: "user"}
// })