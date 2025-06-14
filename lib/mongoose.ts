// lib/mongodb.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const MONGODB_URI = process.env.MONGO;
console.log('MONGO:', process.env.MONGO);
if (!MONGODB_URI) {
  throw new Error('⚠️ Please define the MONGO environment variable inside .env');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) return cached.conn;
  
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI!, { // Use non-null assertion here
        bufferCommands: false,
      }).then((mongoose) => {
        console.log('[DATABASE] Connected to MongoDB!');
        return mongoose;
      });
    }
  
    cached.conn = await cached.promise;
    return cached.conn;
  }

export default dbConnect;
