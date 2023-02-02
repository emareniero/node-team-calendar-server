/*
 * Rutas de Usuarios / Auth
 * host + /api/auth
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { loginUsuario, crearUsuario, revalidarToken } = require("../controllers/auth");
const { validarCampos } = require("../midlewares/validarCampos");
const { validarJWT } = require("../midlewares/validarJwt");
const router = Router();

router.post(
  "/new",
  [ // midlewares
    check("name", "El nombre es obligatorio!").not().isEmpty(),
    check("email", "El email es obligatorio!").isEmail(),
    check("password", "El password debe tener al menos 6 caracteres!").isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [ // midlewares
    check("email", "El email es obligatorio!").isEmail(),
    check("password", "El password debe tener al menos 6 caracteres!").isLength({ min: 6 }),
    validarCampos,
  ],
  loginUsuario
);

router.get(
  "/renew", 
  validarJWT, 
  revalidarToken);

module.exports = router;
