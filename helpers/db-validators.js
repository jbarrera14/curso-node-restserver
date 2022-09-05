const Role  = require('../models/role');
const Usuario = require('../models/usuario.model');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async(correo = '') => {
    const existe = await Usuario.findOne({ correo });
    if (existe) {
        throw new Error(`El correo:  ${ correo } ya está en uso`);
    }
}

const existeIdPorUsuario = async( id ) => {
    const existe = await Usuario.findById(id);
    if ( !existe ) {
        throw new Error(`No existe un usuario con el ID ${id} `);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeIdPorUsuario
}