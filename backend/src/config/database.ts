import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gilded-noir';
    
    await mongoose.connect(mongoURI);
    console.log('✅ Conectado a MongoDB');
    
    // Manejar desconexión
    mongoose.connection.on('error', (err: Error) => {
      console.error('❌ Error de conexión MongoDB:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ Desconectado de MongoDB');
    });
    
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};
