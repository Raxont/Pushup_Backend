const jwt = require('jsonwebtoken');
process.loadEnvFile();

/**
 * Genera un token JWT con la información del usuario y una duración de 1 hora.
 * @param {Object} user - Información del usuario para incluir en el token.
 * @returns {string} - Token JWT generado.
 */
exports.generateToken = user => {	
	// Genera un token JWT con la información del usuario y una duración de 1 hora
	return jwt.sign(user, process.env.SECRET_JWT_KEY, { expiresIn: '1h' });
};

/**
 * Verifica si el token JWT es válido usando la clave secreta.
 * @param {string} token - Token JWT a verificar.
 * @param {Function} callback - Función de callback que maneja el resultado de la verificación.
 */
exports.verifyToken = (token, callback) => {
	// Verifica si el token JWT es válido usando la clave secreta
	jwt.verify(token, process.env.SECRET_JWT_KEY, callback);
};