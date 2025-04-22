const express = require('express');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const path = require('path');
// utilizar express
const app = express();

// Cargar las variables de entorno
dotenv.config(); 

// Asignación de puerto
const PORT = process.env.PORT;

// Permisos para realizar peticiones put y delete
app.use(methodOverride('_method'));

// Manejar el renderizado de public y views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public')); // actua para funcionar con lso estaticos de las imagenes

// Procesar datos de los formularios 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layout'); 

// ---------Conecciones---------
// Mongo
const {conectarMongo} = require('./controller/config/conexionMongo')
conectarMongo();

// Validación del user si es admin o no
const sesion = require('express-session');
const rutasUser = require('./routes/rutasUser'); // Importación de las rutas del usuario
app.use(express.urlencoded({extended:true}));
app.use(sesion({
    secret: 'Es un secreto que tu mirada y la mia un presentimiento',
    resave: false,
    saveUninitialized:false
}));

// Middleware que tiene que ver con la sesión 
const {esAdmin} = require('./middlewares/authMiddleware'); // verifica si es admin
const {varUser} = require('./middlewares/authMiddleware'); // es la variable globar para el usuario
const {haySesion} = require('./middlewares/authMiddleware'); // verifica si hay una sesion iniciada o no
// Alt + Shift + Arriba/Abajo para duplicar una linea

// -----Importacion de rutas-------
const rutasCortes = require('./routes/rutasCortes');
const rutasCortesPublicas = require('./routes/rutasUserCortes');

// ------------Vairbales Globales------------
app.use(varUser);

// ---------RUTAS---------

// Ruta principal
app.get('/', (req, res) => {
    res.render('home');
});
   
// Rutas login y registro
app.use('/publicViews/user', rutasUser);

app.get('/userComp', (req, res) => {  
    // Ruta temporal para la comprobación del usuario
    res.render('publicViews/userComp');
});

app.get('/esAdmin', esAdmin, (req,res) => {
    res.render('/admin/esAdmin');
});


// Rutas Mongo Cortes
app.use('/admin/cortes', rutasCortes);
app.use('/cortes', rutasCortesPublicas);



// definir el puerto
app.listen(PORT, () =>{
    console.log(`🚗 Corriendo en el puerto http://localhost:${PORT}`);
})