const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const client = require('prom-client');  // Prometheus client

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
dotenv.config({ path: "./config.env" });

// MongoDB connection
const DB = process.env.DB || 'mongodb://localhost:27017/mern-student-db';
mongoose.connect(DB).then(() => console.log("MongoDB connected..."));

// Set up Prometheus metrics registry
const register = new client.Registry();
client.collectDefaultMetrics({ register });  // Collect default system metrics

// Expose /metrics endpoint for Prometheus scraping
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

// Routes
app.use("/api", studentRoutes);

// Error handling middleware for undefined routes
app.all("*", function (req, res) {
    res.status(404).json({
        status: "failed",
        msg: "Route not defined yet!",
    });
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is successfully running on Port ${PORT}`);
});
