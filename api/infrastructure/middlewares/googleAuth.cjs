const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ConnectToDatabase = require('../database/mongodb.cjs');
process.loadEnvFile();

// Configuración de la estrategia de autenticación con Google
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID, // ID del cliente de Google
			clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Secreto del cliente de Google
			callbackURL:'http://localhost:3001/usuarios/google/callback', // URL de callback después de la autenticación
			passReqToCallback: true, // Pasa el objeto req al callback
		},
		async (req, accessToken, refreshToken, profile, done) => {
			try {
				// Conecta a la base de datos
				const dbConnection = new ConnectToDatabase();
				await dbConnection.connectOpen();
				const db = dbConnection.db;
				const clienteCollection = db.collection('usuarios');

				// Busca al usuario en la colección "cliente"
				let existingUser = await clienteCollection.findOne({
					id: profile.id
				});

				if (existingUser) {
					// Si el usuario ya existe, devuelve el usuario con el campo isRegistered
					(existingUser = profile), (existingUser.isRegistered = true);
					return done(null, existingUser);
				} else {
					// Si no existe, crea un objeto de usuario con isRegistered = false
                    (existingUser = profile), (existingUser.isRegistered = false);
					return done(null, existingUser);
				}
			} catch (error) {
				return done(error, false);
			}
		},
	),
);

// Serializa el usuario en la sesión
passport.serializeUser((user, done) => {
    done(null, user.id); // Guarda solo el ID del usuario en la sesión
});

// Deserializa el usuario de la sesión
passport.deserializeUser(async (id, done) => {
    done(null, done);
});

module.exports = passport; // Exporta el objeto de configuración de passport