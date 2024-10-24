// Importa los módulos necesarios para la gestión de usuarios.
const UserModel = require("../models/usuariosModel.cjs");
const bcrypt = require("bcryptjs");
const jwtUtils = require("../utils/jwtUtils.cjs");
const { validationResult } = require("express-validator");

/**
 * Clase UserController que gestiona las peticiones HTTP relacionadas con usuarios.
 */
class UserController {
  constructor() {
    this.userModel = new UserModel(); // Inicializa el servicio de usuarios.
    this.googleCallback = this.googleCallback.bind(this); // Enlaza el método al contexto de la clase.
    this.passportLogin = this.passportLogin.bind(this);   // Enlaza el método al contexto de la clase.
  }

  /**
   * Obtiene todos los usuarios.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async getUsers(req, res) {
    try {
      const users = await this.userModel.getAllUsers();
      if (!users) {
        return res.status(404).json({ message: "Users not found" });
      }

      res.status(200).json(users);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  /**
   * Obtiene un usuario específico por su ID.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async getUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const user = await this.userModel.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  /**
   * Busca un usuario por su ID.
   * @param {string} userId - El ID del usuario a buscar.
   * @returns {Promise<Object|null>} - Devuelve el usuario encontrado o null si no existe.
   */
  async findUserById(userId) {
    try {
      const user = await this.userModel.getUserById(userId);
      if (!user) {
        return null; // No se encontró el usuario
      }
      return user; // Retorna el usuario encontrado
    } catch (error) {
      throw new Error("Error al obtener el usuario"); // Manejo de errores
    }
  }

  /**
   * Crea un nuevo usuario en la base de datos.
   * @param {Object} req - La solicitud HTTP, contiene los datos del nuevo usuario en el body.
   * @param {Object} res - La respuesta HTTP para enviar el resultado de la operación.
   * @returns {Promise<void>}
   */
  async createUser(req, res) {
    try {
      // Validar los datos del request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // Verificar si el nombre ya existe en la base de datos
      const existingUserNombre = await this.userModel.findByNick(
        req.body.nombre
      );
      if (existingUserNombre) {
        // Devolver el error en el formato esperado por el frontend
        return res.status(400).json({
          errors: [{ path: "nombre", msg: "El nombre ya esta en uso" }],
        });
      }
      // Verificar si el email ya existe en la base de datos
      const existingUserEmail = await this.userModel.findByEmail(
        req.body.correo
      );
      if (existingUserEmail) {
        // Devolver el error en el formato esperado por el frontend
        return res.status(400).json({
          errors: [{ path: "correo", msg: "El correo ya esta en uso" }],
        });
      }

      // Hashear la contraseña antes de guardar al usuario
      req.body.password = await bcrypt.hash(req.body.password, 10);

      // Crear el nuevo usuario
      const user = await this.userModel.insert(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ errors: [{ path: "general", msg: "Internal server error" }] });
    }
  }

  /**
   * Actualiza un usuario específico por su ID.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async updateUserForms(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const user = await this.userModel.updateUserForm(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  /**
   * Actualiza un usuario por su ID y datos proporcionados.
   * @param {string} userId - El ID del usuario a actualizar.
   * @param {Object} updatedData - Los nuevos datos del usuario.
   * @returns {Promise<Object|null>} - Devuelve el usuario actualizado o null si no se encontró.
   */
  async updateUserById(userId, updatedData) {
    try {
      const user = await this.userModel.updateUserForm(userId, updatedData);
      if (!user) {
        return null; // Retorna null si no encuentra el usuario
      }
      return user; // Retorna el usuario actualizado
    } catch (error) {
      throw new Error("Error al actualizar el usuario"); // Lanza un error para que lo maneje el llamador
    }
  }

  /**
   * Elimina un usuario específico por su ID.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async deleteUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const user = await this.userModel.deleteUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  /**
   * Busca usuarios por su nombre.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async searchUsers(req, res) {
    try {
      const users = await this.userModel.searchUsersByName(req.query.name);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async googleCallback(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 400,
          message: "Error en la validacion del callback de google"
        });
      }
      const usuario = req.user;
       // Verificar si req.user es válido
       if (!usuario) {
        return res.status(400).json({
          status: 400,
          message: "El usuario no es valido"
        });
      }

      // Verifica si el usuario está registrado o no
      if (!usuario.isRegistered) {
        // Reutilizar createUserPassport para crear el nuevo usuario
        const body = {
          id: usuario.id,
          nombre: usuario.displayName,
          email: usuario.emails[0].value || "none@gmail.com",
          contrasena_hash: "",
          fecha_de_creacion: new Date()
        };
  
        // Llama a createUserPassport para crear al usuario
        await this.userModel.insert(body);
      }
  
      // Loguearse con el usuario de passport
      const { token, user } = await this.passportLogin(req, res);
  
      // Verificar si token y userData son válidos
      if (!token || !user) {
        return res.status(500).json({
          status: 500,
          message: "Error en la autenticación: Token o datos del usuario no válidos"
        });
      }
      
      res.json({
        status: 200,
        message: "Usuario autenticado con éxito",
        data: { token, user }
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error en la autenticación con Google"
      });
    }
  }

  async passportLogin(req, res) {
    try {
      const userData = req.user;
      const token = jwtUtils.generateToken(userData);
  
      // Verificar si el token fue generado correctamente
      if (!token) {
        res.status(500).json({
          status: 500,
          message: "Error en la generacion del token"
        });
      }

      req.session.token = token;
      return { token, user:userData };
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error en el logueo con Google"
      });
    }
  }

  /**
   * Inicia sesión un usuario.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const usuario = await this.userModel.findByNick(req.body.nombre);
      if (
        !usuario ||
        !(await bcrypt.compare(req.body.password, usuario.password))
      ) {
        return res.status(400).json({ message: "Invalid nick or password" });
      }

      const userData = {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
      };
      const token = jwtUtils.generateToken(userData);
      const user = usuario.id;
      req.session.passport = { user: user };
      req.session.token = token;

      res.status(200).json({ token, userData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

// Exporta la clase UserController para su uso en otras partes de la aplicación.
module.exports = UserController;
