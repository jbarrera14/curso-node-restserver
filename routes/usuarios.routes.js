const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeIdPorUsuario } = require('../helpers/db-validators');

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usarios.controller');


const router = Router();

router.get('/', [
    check('limite', 'El LIMITE debe ser un valor numérico').isNumeric(),
    check('desde', 'El DESDE debe ser un valor numérico').isNumeric(),
    validarCampos
],usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeIdPorUsuario),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe contener más de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'No es un correo valido - check routes').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol','No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    // check('rol).custom( (rol) => esRoleValido(rol) ) //es lo mismo pero mas simple la linea de arriba
    validarCampos
] ,usuariosPost);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeIdPorUsuario),
    validarCampos
],usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;