const session = require("express-session"); // Importa el middleware de sesiones para Express
process.loadEnvFile();

//* Configuración de la sesión para Express
/**
 * Configuración del middleware de sesión para gestionar sesiones de usuario en la aplicación.
 * @type {Object} sessionConfig - Configuración de la sesión.
 * @property {string} secret - Clave secreta utilizada para firmar la sesión.
 * @property {boolean} resave - Evita que la sesión se guarde de nuevo si no ha habido cambios.
 * @property {boolean} saveUninitialized - No guarda sesiones vacías (sin datos) en la base de datos.
 * @property {Object} cookie - Configuración de las cookies de sesión.
 * @property {boolean} cookie.secure - Usa cookies seguras solo en producción.
 * @property {boolean} cookie.httpOnly - Permite el acceso a la cookie desde el lado del cliente (puede ser ajustado a true por seguridad).
 * @property {number} cookie.maxAge - Duración de la sesión: 1 hora (en milisegundos).
 */
const sessionConfig = session({
  secret: process.env.SECRET_JWT_KEY, // Clave secreta utilizada para firmar la sesión
  resave: false, // Evita que la sesión se guarde de nuevo si no ha habido cambios
  saveUninitialized: false, // No guarda sesiones vacías (sin datos) en la base de datos
  cookie: {
    secure: process.env.NODE_ENV === "production", // Usa cookies seguras solo en producción
    httpOnly: true, // Permite el acceso a la cookie desde el lado del cliente (puede ser ajustado a true por seguridad)
    maxAge: 30 * 60 * 1000, // Duración de la sesión: 30 minutos (en milisegundos)
  },
});

module.exports = sessionConfig; // Exporta la configuración de sesión para su uso en otros módulos
