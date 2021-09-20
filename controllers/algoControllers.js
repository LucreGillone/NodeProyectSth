const path = require("path")
const Experience = require("../models/Experience")

const algoControllers = {
    home: async (req, res) => {
        const experiences = await Experience.find()
            return res.render("index",{
                title: "Home",
                experiences,
                loggedIn: req.session.loggedIn,
                admin: req.session.admin,
                userId: req.session.userId,
                name: null || req.session.name
            })
    },
        
    signUp: (req, res) => {
        if(req.session.loggedIn) {
            res.redirect("/")
        } else {
            res.render("signUp", {
                title: "Sign Up",
                loggedIn: req.session.loggedIn,
                error: null
            })
        }
    },

    logIn: (req, res) => {
        if(req.session.loggedIn) {
            res.redirect("/")
        } else {
            res.render("logIn", {
                title: "Log In",
                loggedIn: req.session.loggedIn, 
                error: null
            })
        }
    },
    
    profile: async (req, res) => {
        if (!req.session.loggedIn) {
            res.redirect("/")
        } else {
            const experiences = await Experience.find()
            const experience = await Experience.findOne({_id: req.params._id})
            res.render("profile", {
                title: "Favourite Experiences",
                loggedIn: req.session.loggedIn,
                userId: req.session.userId,
                name: req.session.name,
                admin: req.session.admin,
                edit: experience,
                error: null,
                experiences
            })
        }
    },

    newExperience: (req, res) => {
        if (req.session.admin) {
            return res.render("newExperience", {
                    title: "New Exprerience",
                    error: null,
                    edit: false,
                    loggedIn: req.session.loggedIn,
                    userId: req.session.userId,
                    admin: req.session.admin
            })
        }
        res.redirect("/unauthorized")
    },
    
    addExperience: async (req, res) => {
        const {title, description, url, price, _id} = req.body
        let newExperience 
        if (!_id) {
            newExperience = new Experience({
            title, 
            description,
            url, 
            price,
            loggedIn: req.session.loggedIn,
            userId: req.params._id,
            admin: req.session.admin,           
        })
        } else {
            newExperience = await Experience.findOne({_id})
			newExperience.title = title
			newExperience.price = price
			newExperience.url = url
			newExperience.description = description	
            newExperience.userId = req.params._id
        }
        try {
            await newExperience.save()
            res.redirect("/")
        } 
        catch (e) {
            res.render("newExperience", {
                title: "New Experience",
                error: e,
                loggedIn: req.session.loggedIn
            })
        }
    },

    deleteExperience: async (req, res) => {
        await Experience.findOneAndDelete({_id: req.params._id})
        res.redirect("/")
    },

    editExperience: async (req, res) => {
        const experience = await Experience.findOne({_id: req.params._id})
		res.render("newExperience", {
			title: 'editExperience',
            error: null,
			edit: experience,
			loggedIn : req.session.loggedIn,
            userId: req.session.userId,
            admin: req.session.admin,
		})
	},
    
    likeExperence: async (req, res) => {
        Experience.findOne({_id: req.query.experienceId})
        .then((experience) => {
            if(experience.likes.includes(req.query.idUser)){
                Experience.findOneAndUpdate({_id: req.query.experienceId}, {$pull:{likes: req.query.idUser}})
                .then(() => 
                    Experience.find()
                    .then((experiences) => res.render("index",{
                        title: "Home",
                        experiences,
                        loggedIn: req.session.loggedIn,
                        admin: req.session.admin,
                        userId: req.session.userId,
                        name: null || req.session.name,
                        error: null
                    }))
                )
            } else {
                Experience.findOneAndUpdate({_id: req.query.experienceId}, {$push:{likes: req.query.idUser}})
                .then(() => 
                    Experience.find()
                    .then((experiences) => res.render("index",{
                        title: "Home",
                        experiences,
                        loggedIn: req.session.loggedIn,
                        admin: req.session.admin,
                        userId: req.session.userId,
                        name: null || req.session.name,
                        error: null
                    }))
                )
            }
        })
        .catch ((e) => {
            console.log(e)
            res.redirect("/")
        })
    },

    unauthorized: (req, res) => {
        res.render("unauthorized", {
            title: "Unauthorized",
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
            admin: false
        })
    }

}

module.exports = algoControllers