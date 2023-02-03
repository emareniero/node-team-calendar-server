/*
 * Rutas de Eventos / Events
 * host + /api/events
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../midlewares/validarCampos");
const { validarJWT } = require("../midlewares/validarJwt");

const router = Router();

// Todas las rutas deben estar validadas
router.use(validarJWT);

// Obtener los eventos
router.get("/", [], getEventos);

// Crear un evento
router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

// Actualizar un evento
router.put("/:id", [], actualizarEvento);

// Borrar un evento
router.delete("/:id", [], eliminarEvento);

module.exports = router;
