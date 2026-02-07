import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();


const uri = process.env.MONGODB_URI;
if (!uri) {
console.error('MONGODB_URI not set in .env');
process.exit(1);
}


export const connectDB = async (): Promise<void> => {
try {
await mongoose.connect(uri);
console.log('MongoDB connected');
} catch (err) {
console.error('MongoDB connection error', err);
process.exit(1);
}
};


export default connectDB;