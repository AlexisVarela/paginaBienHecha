const User = require('../models/modelUser');
const bcrypt = require('bcrypt');

// Metodo oara registrar usuario
const registerUser = async (req, res) => {
    const { username, email ,password, role } = req.body;
  
    try {
      // Verificar si el usuario ya existe
      const usuarioExistente = await User.findOne({ username });
      if (usuarioExistente) {
        return res.send('El usuario ya existe pa');
      }
  
      // Encriptar contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear usuario
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: role || 2 // por defecto es usuario
      });
  
      await newUser.save();
      res.send('Si se pudo registrar 🙂');
    } catch (error) {
      console.error(error);
      res.status(500).send('Errgor, Esta mal, en algoo...');
    }
  };

// metodo para manejar el login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.send('Usuario no encontrado');
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.send('Contraseña incorrecta');
  
      // se guarda al usuario en la sesion
      req.session.user = {
        id: user._id,
        username: user.username,
        role: user.role
      };
  
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al iniciar sesión');
    }
  };
  
  module.exports = {registerUser,loginUser};