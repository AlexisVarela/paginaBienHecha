const Corte = require('../models/modelCortes'); // Importar el modelo de los cortes

// Obtener todos los cortes
const getCortes = async (req, res) => {
    try {
        const cortes = await Corte.find();
        res.render('admin/cortes', { title: 'Lista de Cortes', cortes }); // Aqui lo renderiza a cada vista
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener los cortes");
    }
};

// obtener cortes para vistas de usuarios
const getCortesUser = async (req, res) => {
    try {
        const cortes = await Corte.find();
        // res.sendFile(path.join(__dirname, 'views/publicViews/cortes/cards.ejs'));
        res.render('publicViews/cardsCortes', { title: 'Cortes Cards', cortes }); // Aqui lo renderiza a cada vista
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener los cortes");
    }
};

// Agregar un nuevo corte
const addCorte = async (req, res) => {
    try {
        const { corte, precio } = req.body;
        const nuevoCorte = new Corte({ corte, precio });
        await nuevoCorte.save();
        res.redirect('/admin/cortes'); // Redirige a la lista de cortes
    } catch (err) {
        console.error(err);
        res.status(400).send("Error al agregar el corte");
    }
};

// Editar un corte existente
const updateCorte = async (req, res) => {
    try {
        const { id } = req.params;
        const { corte, precio } = req.body;
        await Corte.findByIdAndUpdate(id, { corte, precio, imagen });
        res.redirect('/admin/cortes');
    } catch (err) {
        console.error(err);
        res.status(400).send("Error al actualizar el corte");
    }
};

// Eliminar un corte
const deleteCorte = async (req, res) => {
    try {
        const { id } = req.params;
        await Corte.findByIdAndDelete(id);
        res.redirect('/admin/cortes');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar el corte");
    }
};

// metodos para cortes 20

// obtener cortes para vistas de usuarios
const getCortes20 = async (req, res) => {
    try {
        const cortes = await Corte.find();
        // res.sendFile(path.join(__dirname, 'views/publicViews/cortes/cards.ejs'));
        res.render('admin/cortes20', { title: 'Cortes Cards', cortes }); // Aqui lo renderiza a cada vista
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener los cortes");
    }
};

// Agregar un nuevo corte
const addCorte20 = async (req, res) => {
    try {
        const { corte, precio } = req.body;
        const imagen = req.file ? req.file.filename : null;
        
        const nuevoCorte = new Corte({ corte, precio, imagen });
        await nuevoCorte.save();
        res.redirect('/admin/cortes20'); // Redirige a la lista de cortes
    } catch (err) {
        console.error(err);
        res.status(400).send("Error al agregar el corte");
    }
};

// Editar un corte existente
const updateCorte20 = async (req, res) => {
    try {
        const { id } = req.params;
        const { corte, precio } = req.body;
        let updateDate = {corte, precio};

        if (req.file) {
            updateDate.imagen = req.file.filename;
        }
        
        await Corte.findByIdAndUpdate(id, updateDate);
        res.redirect('/admin/cortes20');
    } catch (err) {
        console.error(err);
        res.status(400).send("Error al actualizar el corte");
    }
};

// Eliminar un corte
const deleteCorte20 = async (req, res) => {
    try {
        const { id } = req.params;
        await Corte.findByIdAndDelete(id);
        res.redirect('/admin/cortes20');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar el corte");
    }
};


// cortes 1
module.exports = { getCortes, getCortesUser, addCorte, updateCorte, deleteCorte,
        // Cortes 2
        getCortes20, addCorte20, updateCorte20, deleteCorte20
 };

