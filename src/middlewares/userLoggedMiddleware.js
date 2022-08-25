async function userLoggedMiddleware (req,res,next){
    res.locals.isLogged = false

    let userCookie = req.cookies.user
    
    if(userCookie){
        req.session.userLogged = userCookie
    }
    
    if(req.session.userLogged){
        res.locals.isLogged = true
    }
    next()
}

module.exports = userLoggedMiddleware