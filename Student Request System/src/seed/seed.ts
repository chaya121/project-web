import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';

dotenv.config();

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI not found');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await User.deleteMany();

    const users = [
      {
        email: 'admin@test.com',
        password: 'password123',
      },
      {
        email: 'user@test.com',
        password: 'password123',
      },
    ];

    for (const data of users) {
      const user = new User(data);
      await user.save(); // password จะถูก hash อัตโนมัติ
    }

    console.log('Seed completed');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
