const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../infrastructure/database/mongodb.cjs");
class Productos{
    
    async findAll () {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('pagos');
        
        const res = await collection.find().toArray();
        return res;
    }
    
    async findById (id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('pagos');
        const [res] = await collection.find({_id: new ObjectId(id)}).toArray();
        return res;
    }
    async insert(productData){
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. En el domain/repositories/productRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('pagos');
        const res = await collection.insertOne(productData);
        return res;
    }
    async findByIdAndUpdate(id, updateData, upsert){
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. En el domain/repositories/productRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('pagos');
        const res = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData }, upsert);
        return res;
    }
    async findByIdAndDelete(id){
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('pagos');
        const res = await collection.deleteMany({ _id: new ObjectId(id) });
        return res;
    }

    async find(find){
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('pagos');
        const res = await collection.find(find).toArray();
        return res;
    }
    
}

module.exports = Productos;