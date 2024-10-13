// app.js
const express = require('express');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // To parse JSON bodies

// API routes
app.use('/api/students', studentRoutes);

// Healthcheck endpoint
app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

module.exports = app;
