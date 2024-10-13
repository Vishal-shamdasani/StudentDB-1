const mongoose = require('mongoose');
require('dotenv').config(); // Load the .env file

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully to', conn.connection.host);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

connectDB();
