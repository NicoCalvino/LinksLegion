async function guestMiddleware (req,res,next){
    if (req.session.userLogged){
        return res.redirect('/links')
    }
    next()
}

module.exports=guestMiddleware