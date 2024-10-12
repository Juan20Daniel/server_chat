const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONN_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DATABASE MONGO HAS BEEN CONNECTED');
    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar con la base de datos.');
    }
}

module.exports = connection;