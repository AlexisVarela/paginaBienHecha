const express= require('express'); // Para el manejo de rutas
const router = express.Router(); // Se utiliza para poder crear las rutas
// Importar los metodos del controlador
const {getCortes, getCortesUser, addCorte, updateCorte, deleteCorte }= require('../controller/corteController');

// Creación de rutas 
router.get('/', getCortes);
router.get('/cortesUser', getCortesUser);
router.post('/addCorte', addCorte);
router.post('/editCorte/:id', updateCorte);
router.post('/deteleCorte/:id', deleteCorte);

// Exportar las rutas
module.exports = router;