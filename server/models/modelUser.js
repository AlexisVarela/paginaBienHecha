const mongoose = require('mongoose');

//Realizar esquema de usuarios
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        require:[true, 'NO haz colocado un nombre de usuario'],
        unique:true
    },
    email:{
        type:String,
        require:[true, 'NO haz colocado un correo aun']
    },
    password: {
        type:String,
        require:[true, 'NO haz colocado un password aun']
    },
    role:{
        type: Number,
        require:[true, 'problemas con el rol'],
        enum:[1,2,3], // 1-> admin, 2->user, 3->tecnico
        default:2 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;