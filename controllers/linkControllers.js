const linkControllers = {
    checkURL: (req, res, next) => {
        if(req.url.startsWith('/profile/') || req.url.startsWith('/editExperience/') || req.url.startsWith('/deleteExperience/') || req.url.startsWith('/like/') ){
            next()
        }else{
            let validURL = ["/", "/signUp", "/logIn", "/newExperience", "/unauthorized", "/logOut", "/error"]
            validURL.includes(req.url) ? next() : res.redirect('/error')
        }
    }
}

module.exports = linkControllers