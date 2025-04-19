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

// Procesar datos de los formularios 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layout'); // nombre de tu layout.ejs


// ---------Conecciones---------
// Mongo
const {conectarMongo} = require('./controller/config/conexionMongo')
conectarMongo();

// ---------RUTAS---------

// Ruta principal
app.get('/', (req, res) => {
    res.render('home');
});


// Rutas login y registro
const sesion = require('express-session');
const rutasUser = require('./routes/rutasUser');
app.use(express.urlencoded({extended:true}));
app.use(sesion({
    secret: 'Es un secreto que tu mirada y la mia un presentimiento',
    resave: false,
    saveUninitialized:false
}));
app.use('/user', rutasUser);

app.get('/userComp', (req, res) => {
    res.render('userComp', {user: req.session.user});
});
// app.use((req, res, next) => { // Funciona para acceder al usuario desde cualquier vista
//     res.locals.user = req.session.user || null;
//     next();
//   });


// Rutas Mongo Cortes
const rutasCortes = require('./routes/rutasCortes');
app.use('/cortes', rutasCortes);




// definir el puerto
app.listen(PORT, () =>{
    console.log(`🚗 Corriendo en el puerto http://localhost:${PORT}`);
})