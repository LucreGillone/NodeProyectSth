const User = require("../models/User")
const Experience = require("../models/Experience")
const bcryptjs = require("bcryptjs")

const userControllers = {
    signUp: async (req, res) => {
        const {name, email, password, url, admin} = req.body
        let hashedPassword = bcryptjs.hashSync(password)
        let newUser = new User({name, email, password: hashedPassword, url, admin: admin === "on"})
        try {
            let repeatedEmail = await User.findOne({where: {email}})
            if (repeatedEmail) throw new Error ("This email is already in use")
            await newUser.save()
            req.session.loggedIn = true
            req.session.name = newUser.name
            req.session.userId = newUser.id
            res.redirect("/")
        } catch (e) {
            return res.render("signUp", {
                title: "Sign Up", 
                loggedIn: req.session.loggedIn,
                error: "This email is already in use"
            })
        }
    },

    logIn: async (req, res) => {
        const {email, password} =req.body
        try {
            let user = await User.findOne({where: {email}})
            if (!user) throw new Error("Email and/or password incorrect")
            let coincidence = bcryptjs.compareSync(password, user.password)
            if (!coincidence) throw new Error ("Email and/or password incorrect")
            if (user && coincidence) {
                req.session.loggedIn = true
                req.session.name = user.name
                req.session.admin = user.admin
                req.session.userId = user.id
                return res.redirect("/")
            }

        } catch {
           return res.render("logIn", {
                title: "Log In", 
                loggedIn: false, 
                error: "Email and/or password incorrect"
            })
        }
    },

    logOut: (req, res) => {
        req.session.destroy(() =>{
            res.redirect("/")
        })
    },

    // favExperiences : async (req, res) => {
    //     Experience.findOne({id: req.query.experienceId})
    //     .then((experience) => {
    //         if(experience.likes.includes(req.query.idUser)){
    //             User.findOneAndUpdate({id: req.query.idUser}, {$push:{favs: req.query.experienceId}})
    //             .then(() => res.render("profile",{
    //                     title: "Favourite Experiences",
    //                     loggedIn: req.session.loggedIn,
    //                     userId: req.session.userId,
    //                     name: req.session.name,
    //                     experience,
    //                     admin: req.session.admin,
    //                     userId: req.session.userId,
    //                     name: null || req.session.name,
    //                 })
    //             )
    //         } else {
    //             User.findOneAndUpdate({id: req.query.idUser}, {$pull:{favs: req.query.experienceId}})
    //             .then(() => res.render("profile",{
    //                     title: "Favourite Experiences",
    //                     loggedIn: req.session.loggedIn,
    //                     userId: req.session.userId,
    //                     name: req.session.name,
    //                     experience,
    //                     admin: req.session.admin,
    //                     userId: req.session.userId,
    //                     name: null || req.session.name,
    //                 })
    //             )
    //         }
        
    //     })
    //     .catch ((e) => {
    //         console.log(e)
    //         res.redirect("/")
    //     })
    // }
}

module.exports = userControllers