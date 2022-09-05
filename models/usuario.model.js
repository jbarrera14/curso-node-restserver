const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

// this.toObject me va a generar la instancia pero con sus valores respectivos
// ...usuario --> Operador rest unifica el resto de los argumentos uno solo que se llame usuario en este caso.
UsuarioSchema.methods.toJSON = function() {
    const { password, __v, ...usuario} = this.toObject();
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );