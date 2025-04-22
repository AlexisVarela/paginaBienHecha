const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// rutas registro
router.get('/register', (req, res)=>{ // renderiza la ruta del formulario
    res.render('publicViews/register');
});
// procesa los datos del formulario
router.post('/register', userController.registerUser);

// rutas login
router.get('/login', (req, res)=>{
    res.render('publicViews/login');
});
// procesar los datos del login
router.post('/login', userController.loginUser);


// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('login');
    });
});

module.exports = router;