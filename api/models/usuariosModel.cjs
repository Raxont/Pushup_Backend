const ConnectToDatabase = require("../infrastructure/database/mongodb.cjs");
class Usuarios {

  /**
   * Encuentra un usuario por su nickname.
   * @param {string} nick - Nickname del usuario a buscar.
   * @returns {Promise<Object>} - El usuario encontrado.
   */
  async getAllUsers(nombre) {
    let obj = ConnectToDatabase.instanceConnect; // Obtener la instancia de conexión a la base de datos
    const collection = obj.db.collection("usuarios"); // Acceder a la colección 'cliente'
    const res = await collection.find().toArray(); // Buscar el usuario por nickname
    return res;
  }

  /**
   * Encuentra un usuario por su nickname.
   * @param {string} nick - Nickname del usuario a buscar.
   * @returns {Promise<Object>} - El usuario encontrado.
   */
  async findByNick(nombre) {
    let obj = ConnectToDatabase.instanceConnect; // Obtener la instancia de conexión a la base de datos
    const collection = obj.db.collection("usuarios"); // Acceder a la colección 'cliente'
    const [res] = await collection.find({ nombre }).toArray(); // Buscar el usuario por nickname
    return res;
  }

  async findByEmail(email) {
    let obj = ConnectToDatabase.instanceConnect; // Obtener la instancia de conexión a la base de datos
    const collection = obj.db.collection("usuarios"); // Acceder a la colección 'cliente'
    const [res] = await collection.find({ email }).toArray(); // Buscar el usuario por nickname
    return res;
  }

  async getUserById(id) {
    let obj = ConnectToDatabase.instanceConnect;
    const collection = obj.db.collection('usuarios');
    const [res] = await collection.find({ id: id }).toArray();
    return res;
  }

  /**
   * Inserta un nuevo usuario en la colección.
   * @param {Object} userData - Datos del usuario a insertar.
   * @returns {Promise<Object>} - Resultado de la operación de inserción.
   */
  async insert(userData) {
    let obj = ConnectToDatabase.instanceConnect; // Obtener la instancia de conexión a la base de datos
    const collection = obj.db.collection("usuarios"); // Acceder a la colección 'usuarios'
    const res = await collection.insertOne(userData); // Insertar el nuevo usuario
    return res;
  }

  async findByIdAndUpdateForm(id, updateData) {
    let obj = ConnectToDatabase.instanceConnect;
    const collection = obj.db.collection("usuarios");
    await collection.updateOne(
      { id: id },
      { $set: updateData },
      {upsert:false}
    );
    return updateData;
  }

  /**
	 * Elimina un usuario por su ID.
	 * @param {string} id - ID del usuario a eliminar.
	 * @returns {Promise<Object>} - Resultado de la operación de eliminación.
	 */
	async deleteUser(id) {
		let obj = ConnectToDatabase.instanceConnect; // Obtener la instancia de conexión a la base de datos
		const collection = obj.db.collection('cliente'); // Acceder a la colección 'cliente'
	  await collection.deleteOne({ id: id }); // Eliminar el usuario
		return id;
	}
}

module.exports = Usuarios;
