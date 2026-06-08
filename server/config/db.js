// db.js - Connects the Express backend to MongoDB using Mongoose.
import mongoose from 'mongoose'

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI

  if (!mongoUri || mongoUri === 'your_mongodb_connection_string_here') {
    throw new Error('MONGO_URI is missing. Add a MongoDB connection string to server/.env.')
  }

  await mongoose.connect(mongoUri)
  console.log('MongoDB connected')
}
