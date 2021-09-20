const mongoose = require("mongoose")

const experienceSchema = new mongoose.Schema({
    title: String, 
    description: String, 
    url: String, 
    likes: Array, 
    price: String,
    userId: {type: mongoose.Types.ObjectId, ref: "user"}
})

const Experience = mongoose.model("experience", experienceSchema)

module.exports = Experience