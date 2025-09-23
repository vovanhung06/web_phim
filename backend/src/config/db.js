import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(
        process.env.MONGODB_CONNECTION_STRING
    );
    console.log('MongoDB lien ket thanh cong');}

    catch (error) {
    console.error('Loi ket noi MongoDB:', error);
    process.exit(1);
  }
};
export default connectDB;