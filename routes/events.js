/*
    Rutas de Eventos / events
    /api/events
*/


const { Router } = require("express");
const { check } = require("express-validator");

const { isDate } = require("../helpers/isDate");
const { validarJWT } = require("../middlewares/validar-jwt");
const{ validarCampos } = require("../middlewares/validar-campos")
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");

const router = Router();

// Todas tienen que pasar por la validacion del JWT
router.use( validarJWT ); // .todo lo de abajo de esta linea pasa por el middleware



// Obtener eventos
router.get("/", getEventos);


// Crear eventos
router.post(
    "/",
    [ // middlewares
        check("title", "El titulo es obligatorio").not().isEmpty(),
        //? custom lo utilizamos para crear nosotros la validacion
        check("start", "Fecha de inicio es obligatoria").custom( isDate ),
        check("end", "Fecha de finalizacion es obligatoria").custom( isDate ),
        validarCampos,
    ],
      crearEvento
    );


// Actualizar evento
router.put("/:id", actualizarEvento);


// Borrar evento
router.delete("/:id", eliminarEvento);


module.exports = router;