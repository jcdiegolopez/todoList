const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:TRIWBynM97uhwdCv@cluster0.catby0f.mongodb.net/?retryWrites=true&w=majority');
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
    process.exit(1);
  }
};

module.exports = conectarDB;
