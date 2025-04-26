const express= require('express'); // Para el manejo de rutas
const router = express.Router(); // Se utiliza para poder crear las rutas
// Importar los metodos del controlador
const {getCortes, addCorte, updateCorte, deleteCorte }= require('../controller/corteController');
// Para proteger las rutas del admin
const {esAdmin} = require('../middlewares/authMiddleware');

// Creación de rutas 
router.get('/', esAdmin, getCortes);
router.post('/addCorte', addCorte);
router.post('/editCorte/:id', updateCorte);
router.post('/deleteCorte/:id', deleteCorte);

// Exportar las rutas
module.exports = router;