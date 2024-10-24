// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require("express");
const UserController = require("../controllers/usuariosController.cjs");
const path = require("path");
const fs = require("fs");
const {
	loginLimiter,
	getLimiter,
	postLimiter,
	deleteLimiter,
	putLimiter,
} = require("../infrastructure/middlewares/rateLimit.cjs")
const {
  authenticateToken,
} = require("../infrastructure/middlewares/authMiddleware.cjs");
const passportGoogle = require("../infrastructure/middlewares/googleAuth.cjs");

const router = express.Router();
const userController = new UserController();

/**
 * Obtiene los datos de sesión del usuario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
router.get("/validarSesion", authenticateToken,(req, res) => {  
  if (req.session?.passport?.user) {
    const userId = req.session.passport.user; // Obtén el ID del usuario
    const token = req.session.token || null; // Obtén el token del usuario (si existe)

    res.json({
    status: 200,
    message: 'Acceso autorizado',
    data: {userId,token},
  });
  } else {
    res.status(404).json({ error: "No session data found" });
  }
});

router.get("/google",
  passportGoogle.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passportGoogle.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  userController.googleCallback
);

router.get("/:id", authenticateToken, (req, res) =>
  userController.getUser(req, res)
);

router.get("/", authenticateToken, (req, res) =>
  userController.getUsers(req, res)
);

/**
 * Ruta para loguearse con un usuario creado con email o telefono.
 * @param {Object} req - La solicitud HTTP, contiene los datos del usuario en el cuerpo de la solicitud.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>}
 */
router.post("/iniciarSesion ", loginLimiter,async (req, res) => {
  try {
    await userController.login(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error en el login" });
  }
});

/**
 * Ruta para crear un nuevo usuario con el nombre
 * @param {Object} req - La solicitud HTTP, contiene los datos del usuario en el cuerpo de la solicitud.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>}
 */
router.post("/", (req, res) =>
  userController.createUser(req, res)
);
/**
 * Ruta para actualizar la informacion de un usuario.
 * @param {Object} req - La solicitud HTTP, contiene los datos del usuario en el cuerpo de la solicitud.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>}
 */
router.put("/:id", authenticateToken, (req, res) =>
  userController.updateUserForms(req, res)
);

/**
 * Ruta para eliminar un usuario creado.
 * @param {Object} req - La solicitud HTTP, contiene los datos del usuario en el cuerpo de la solicitud.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>}
 */
router.delete("/:id", authenticateToken, (req, res) =>
  userController.deleteUser(req, res)
);

module.exports = router;
