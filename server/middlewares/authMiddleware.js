// funcion para verificar si es un admin o no
function esAdmin(req, res, next){
    if (req.session.user && req.session.user.role === 1) {
        next();
    } else {
        // res.status(403).send('Tu no la tiene pa, tu no ere admin');
        res.status(403).render('userInvalid');
    }
}

// function for validate if there user or not
function haySesion(req, res, next){
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/publicViews/user/login');
    }
}


function varUser(req, res, next){
    res.locals.user = req.session.user || null;
    next();
}

module.exports= {esAdmin, varUser, haySesion};