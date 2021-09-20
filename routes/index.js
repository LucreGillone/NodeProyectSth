const express = require("express")
const router = express.Router()
const algoControllers = require("../controllers/algoControllers")
const userControllers = require("../controllers/userControllers")

router.route("/")
.get(algoControllers.home)
.post(algoControllers.addExperience)

router.route("/signUp")
.get(algoControllers.signUp)
.post(userControllers.signUp)

router.route("/logIn")
.get(algoControllers.logIn)
.post(userControllers.logIn)

router.route("/newExperience")
.get(algoControllers.newExperience)

router.route("/unauthorized")
.get(algoControllers.unauthorized)

router.route("/logOut")
.get(userControllers.logOut)

router.route("/deleteExperience/:_id")
.get(algoControllers.deleteExperience)

router.route("/editExperience/:_id")
.get(algoControllers.editExperience)

router.route("/profile/:_id")
.get(algoControllers.profile)

router.route("/like")
.get(algoControllers.likeExperence)

module.exports = router