//* Configuración y conexión a MongoDB.
const { MongoClient } = require("mongodb"); // Importa el cliente de MongoDB para gestionar conexiones

//* Clase que gestiona la conexión a la base de datos MongoDB.
class ConnectToDatabase {
    static instanceConnect; // Instancia estática para el patrón Singleton, asegura que solo haya una conexión activa
    db; // Nombre de la base de datos
    connection; // Instancia de conexión a MongoDB
    user; // Nombre de usuario para la conexión
    dbName; // Nombre de la base de datos
    #password; // Propiedad privada para almacenar la contraseña, protegida del acceso directo

    //* Constructor que inicializa los parámetros de conexión.
    /**
     * @param {Object} options - Opciones de conexión.
     * @param {string} options.user - Nombre de usuario para la conexión.
     * @param {string} options.pwd - Contraseña para la conexión.
     * @param {string} options.dbName - Nombre de la base de datos a utilizar.
     */
    constructor({ user, pwd, dbName } = { 
        user: process.env.VITE_MONGO_USER, 
        pwd: process.env.VITE_MONGO_PWD, 
        dbName: process.env.VITE_MONGO_DB_NAME 
    }) {
        // Comprueba si ya existe una conexión y retorna la instancia existente
        if (ConnectToDatabase.instanceConnect && this.connection) {
            return ConnectToDatabase.instanceConnect; // Retorna la instancia existente si ya está conectada
        }
        this.user = user; // Asigna el usuario a la propiedad
        this.setPassword = pwd; // Asigna la contraseña usando el setter
        this.db = dbName; // Asigna el nombre de la base de datos
        ConnectToDatabase.instanceConnect = this; // Establece la instancia actual como la única conexión
    }

    //* Método para abrir la conexión a la base de datos.
    /**
     * Abre la conexión a la base de datos MongoDB.
     * @returns {Promise<void>} - Una promesa que se resuelve cuando la conexión se abre correctamente.
     * @throws {Error} - Lanza un error si la conexión falla.
     */
    async connectOpen() {
        // Crea una nueva instancia de MongoClient con la URL de conexión
        this.connection = new MongoClient(`${process.env.VITE_MONGO_ACCESS}${this.user}:${this.getPassword}@${process.env.VITE_MONGO_HOST}:${process.env.VITE_MONGO_PORT}/${this.db}`);
        try {
            await this.connection.connect(); // Intenta conectar a la base de datos
            this.db = this.connection.db(process.env.VITE_MONGO_DB_NAME); // Selecciona la base de datos
        } catch (error) {
            this.connection = undefined; // Resetea la conexión en caso de error
            throw new Error('Error connecting'); // Lanza un error si la conexión falla
        }
    }

    //* Método para cerrar la conexión a la base de datos.
    /**
     * Cierra la conexión a la base de datos MongoDB.
     * @returns {Promise<void>} - Una promesa que se resuelve cuando la conexión se cierra.
     */
    async connectClose() {
        await this.connection.close(); // Cierra la conexión
    }

    //* Getter para obtener la contraseña.
    /**
     * @returns {string} - La contraseña de la conexión.
     */
    get getPassword() {
        return this.#password; // Retorna la contraseña privada
    }

    //* Setter para establecer la contraseña.
    /**
     * @param {string} pwd - La contraseña que se va a establecer.
     */
    set setPassword(pwd) {
        this.#password = pwd; // Asigna la contraseña privada
    }
}

//* Exporta la clase para su uso en otros módulos.
module.exports = ConnectToDatabase; 
