const express = require('express');
const dotenv = require('dotenv');

// utilizar express
const app = express();

// Cargar las variables de entorno
dotenv.config(); 

// Asignación de puerto
const PORT = process.env.PORT;

// Ruta principal
app.get('/', (req, res) => {
    res.send(`Si jalo jsjs`);
});

// definir el puerto
app.listen(PORT, () =>{
    console.log(`🚗 Corriendo en el puerto http://localhost:${PORT}`);
})