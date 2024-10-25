// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require("express");
const UserController = require("../controllers/usuariosController.cjs");
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
 * @swagger
 * tags:
 *  name: Usuarios
 *  description: Api para la gestion de usuarios
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Usuarios:
 *       type: object
 *       required:
 *        - nombre
 *        - email
 *        - contrasena_hash
 *       properties:
 *         _id:
 *           type: string
 *           example: "671acc1934a4276b56b01010"
 *         id:
 *           type: string
 *           example: "1234567890"
 *         nombre:
 *           type: string
 *           example: "Pedro"
 *         email:
 *           type: string
 *           example: "pedro@gmail.com"
 *         contrasena_hash:
 *           type: string
 *           example: "hash_password"
 *         fecha_de_creacion:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T01:00:00Z"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Usuarios2:
 *       type: object
 *       required:
 *        - nombre
 *        - email
 *        - contrasena_hash
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Pedro"
 *         email:
 *           type: string
 *           example: "pedro@gmail.com"
 *         contrasena_hash:
 *           type: string
 *           example: "hash_password"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Usuarios3:
 *       type: object
 *       required:
 *        - nombre
 *        - email
 *        - contrasena_hash
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Pedro"
 *         contrasena_hash:
 *           type: string
 *           example: "hash_password"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Usuarios4:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "hashed_sesion"
 *         userData:
 *           type: object
 *           properties:
 *            id:
 *             type: string
 *             example: "1234567890"
 *            nombre:
 *             type: string
 *             example: "Pedro"
 *            email:
 *             type: string
 *             example: "pedro@gmail.com"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Usuarios5:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "hashed_sesion"
 *         userId:
 *           type: string
 *           example: "1234567890"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Usuarios6:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Pedro"
 *         email:
 *           type: string
 *           example: "pedro@gmail.com"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Usuarios7:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "1234567890"
 */

/**
 * @swagger
 * /usuarios/validarSesion:
 *   get:
 *     summary: Obtiene la informacion de la sesion
 *     tags : [Usuarios]
 *     responses:
 *       200:
 *         description: Acceso autorizado
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Usuarios5'
 *       404:
 *         description: Desautorizado Sesion no encontrada
 *       429:
 *         description: Tasa de solicitudes superada. Intenta de nuevo más tarde
 */
router.get("/validarSesion", authenticateToken, getLimiter,(req, res) => {  
  if (req.session?.passport?.user) {
    const userId = req.session.passport.user; // Obtén el ID del usuario
    const token = req.session.token || null; // Obtén el token del usuario (si existe)

    res.json({
    status: 200,
    message: 'Acceso autorizado',
    data: {userId,token},
  });
  } else {
    res.status(404).json({  status: 404,
      message: "Desautorizado Sesion no encontrada" });
  }
});

router.get("/google", loginLimiter, 
  passportGoogle.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
  passportGoogle.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  userController.googleCallback
);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por id
 *     tags : [Usuarios]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: El id del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Usuarios'
 *       400:
 *         description: No se encontro ningun usuario
 *       401:
 *         description: Desautorizado Sesion no encontrada
 *       429:
 *         description: Tasa de solicitudes superada. Intenta de nuevo más tarde
 *       500:
 *         description: Error en la obtencion del usuario
 */
router.get("/:id", authenticateToken, getLimiter, (req, res) =>
  userController.getUser(req, res)
);

/**
 * @swagger
 * /usuarios/:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags : [Usuarios]
 *     responses:
 *       200:
 *         description: Usuarios obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuarios'
 *       400:
 *         description: No se encontro ningun usuario
 *       401:
 *         description: Desautorizado Sesion no encontrada
 *       429:
 *         description: Tasa de solicitudes superada. Intenta de nuevo más tarde
 *       500:
 *         description: Error en la obtencion de los usuarios
 */
router.get("/", authenticateToken, getLimiter, (req, res) =>
  userController.getUsers(req, res)
);

/**
 * @swagger
 * /usuarios/iniciarSesion:
 *   post:
 *     summary: Iniciar Sesion
 *     tags : [Usuarios]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/Usuarios3'
 *     responses:
 *       200:
 *         description: Usuario autenticado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Usuarios4'
 *       400:
 *         description: El usuario no es valido
 *       401:
 *         description: Desautorizado Sesion no encontrada
 *       429:
 *         description: Espera 3 minutos antes de volver a intentarlo
 *       500:
 *         description: Error en el logueo
 */
router.post("/iniciarSesion", loginLimiter,(req, res) => {
  userController.login(req, res);
});

/**
 * @swagger
 * /usuarios/:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags : [Usuarios]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/Usuarios2'
 *     responses:
 *       200:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Usuarios'
 *       400:
 *         description: No se creo ningun usuario
 *       401:
 *         description: Desautorizado Sesion no encontrada
 *       429:
 *         description: Tasa de solicitudes superada. Intenta de nuevo más tarde
 *       500:
 *         description: Error en la actualizacion del usuario
 */
router.post("/", postLimiter, (req, res) =>
  userController.createUser(req, res)
);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario
 *     tags : [Usuarios]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: El id del usuario
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/Usuarios6'
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Usuarios6'
 *       400:
 *         description: Usuario no encontrado
 *       401:
 *         description: Desautorizado Sesion no encontrada
 *       429:
 *         description: Tasa de solicitudes superada. Intenta de nuevo más tarde
 *       500:
 *         description: Error interno en el servidor
 */
router.put("/:id", authenticateToken, putLimiter,(req, res) =>
  userController.updateUserForms(req, res)
);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags : [Usuarios]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: El id del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Usuarios7'
 *       400:
 *         description: Usuario no encontrado
 *       401:
 *         description: Desautorizado Sesion no encontrada
 *       429:
 *         description: Tasa de solicitudes superada. Intenta de nuevo más tarde
 *       500:
 *         description: Error en la eliminacion del usuario
 */
router.delete("/:id", authenticateToken, deleteLimiter, (req, res) =>
  userController.deleteUser(req, res)
);

module.exports = router;
