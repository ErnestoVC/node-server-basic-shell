const { Router } = require("express");
const { check } = require("express-validator");
const Role = require('../models/roles.models');

const { usuariosGet, usuariosDelete, usuariosPost, usuariosPut } = require('../controllers/usuarios.controller');
const { validarCampos } = require("../middlewares/validar-campos");
const { esRolValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validator");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", [
    check('id', 'No es un ID válido').isMongoId().custom(existeUsuarioPorId),
    check('correo', 'El correo no es válido').isEmail().custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
] ,usuariosPut);

router.post("/",[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser más de 6 caracteres').isLength({min:6}),
    //check('rol','No es un rol válido.').isIn('ADMIN_ROLE', 'USER_ROLE'),
    check('correo', 'El correo no es válido').isEmail().custom(emailExiste),
    //check('correo').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPost);

router.delete("/:id", [
    check('id', 'No es un ID válido').isMongoId().custom(existeUsuarioPorId),
    validarCampos
] ,usuariosDelete);

module.exports = router;