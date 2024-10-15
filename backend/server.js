const express = require("express");
const mongoose = require("mongoose");
const client = require('prom-client');  // Prometheus client
const dotenv = require("dotenv");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

const register = new client.Registry();

// Enable the collection of default metrics (system metrics)
client.collectDefaultMetrics({ register });

// Define a custom metric for tracking request duration
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',  // Metric name
  help: 'Duration of HTTP requests in seconds',  // Description
  labelNames: ['method', 'route', 'status_code'],  // Labels to classify metrics
});

// Middleware
app.use(express.json());
app.use(cors());

dotenv.config({ path: "./config.env" });

const DB = process.env.DB || 'mongodb://localhost:27017/mern-student-db';

// MongoDB connection
mongoose.connect(DB).then(() => console.log("MongoDB connected..."));

// Routes
// Timing the /api requests using the custom metric
app.use("/api", (req, res, next) => {
  const end = httpRequestDuration.startTimer();  // Start the timer
  res.on('finish', () => {  // When response finishes
    end({ method: req.method, route: req.baseUrl, status_code: res.statusCode });  // Stop the timer and record metrics
  });
  next();  // Continue to the student routes
}, studentRoutes);

// Define a /metrics route for Prometheus to scrape the metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Error handling middleware for undefined routes
app.all("*", function (req, res) {
    res.status(404).json({
        status: "failed",
        msg: "Route not defined yet!",
    });
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is successfully running on Port ${PORT}`);
});
