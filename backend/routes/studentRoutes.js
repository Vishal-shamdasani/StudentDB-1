const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");

// POST a new student
// POST a new student
router.post("/students", async (req, res) => {
    try {
        const { name, age, class: studentClass, grade } = req.body;

        console.log("Request Body:", req.body); // Debugging to log request body

        // Validate required fields
        if (!name || !age || !studentClass || !grade) {
            return res.status(400).json({ message: 'All fields (name, age, class, grade) are required.' });
        }

        // Create a new student
        const student = await Student.create({ name, age, class: studentClass, grade });
        res.status(201).json({
            status: "success",
            student,
        });
    } catch (error) {
        console.error("Error creating student:", error); // Log error details
        if (error.code === 11000) {
            // MongoDB duplicate key error for unique fields (e.g., name)
            res.status(400).json({ message: 'Student with this name already exists.' });
        } else {
            // Handle any other errors
            res.status(500).json({ message: 'An error occurred', error });
        }
    }
});


// GET all students
router.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({
            count: students.length,
            students,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve students', error });
    }
});

// GET a single student by ID
router.get("/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve student', error });
    }
});

// PUT to update a student by ID
router.put("/students/:id", async (req, res) => {
    try {
        const { name, age, class: studentClass, grade } = req.body;

        // Validate required fields
        if (!name || !age || !studentClass || !grade) {
            return res.status(400).json({ message: 'All fields (name, age, class, grade) are required.' });
        }

        const student = await Student.findByIdAndUpdate(req.params.id, { name, age, class: studentClass, grade }, { new: true });
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update student', error });
    }
});

// DELETE a student by ID
router.delete("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json({ message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete student', error });
    }
});

module.exports = router;
