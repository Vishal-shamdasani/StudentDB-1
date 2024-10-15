const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

dotenv.config({ path: "./config.env" });

const DB = process.env.DB;

// MongoDB connection
mongoose.connect(DB).then(() => console.log("MongoDB connected..."));

// Routes
app.use("/api", studentRoutes);

// Error handling middleware
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
