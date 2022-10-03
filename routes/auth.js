/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/


// Forma 1
// const express = require("express");
// const router = express.Router

// Forma 2
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { crearUsuario, loginUsuario, revalidarToken } = require("../controllers/auth");

const router = Router();


router.post(
    "/new",
    [ // middlewares
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe tener al menos 6 caracteres").isLength({min: 6}),
        validarCampos
    ],
     crearUsuario,
    );

router.post(
    "/",
    [
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe tener al menos 6 caracteres").isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
    );

router.get("/renew", revalidarToken );



module.exports = router;