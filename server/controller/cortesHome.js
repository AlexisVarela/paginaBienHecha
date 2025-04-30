const Corte = require('../models/modelCortes');

const getCortesHome = async (req, res) => {
    try{
        const cortes = await Corte.find();
  
        res.render('home', {title: 'Home', cortes});
    } catch {
        console.error(err);
        res.status(500).send('Error al obtener cortes');
    }
}

module.exports = {getCortesHome};