const mongoose = require('mongoose');
require('dotenv').config(); // Ensure environment variables are loaded

const connectDB = async () => {
  try {
    // Connect to MongoDB without deprecated options
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log the host of the MongoDB connection
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error message and exit the process in case of failure
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit with failure status
  }
};

module.exports = connectDB;
