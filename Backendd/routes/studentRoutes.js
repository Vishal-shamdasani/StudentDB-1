const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");

// POST a new student
router.post("/students", async (req, res) => {
    const student = await Student.create(req.body);

    res.status(201).json({
        status: "success",
        student,
    });
});

//
router.get("/students", async (req, res) => {
    const students = await Student.find();
    res.status(200).json({
        students: students.length,
        students,
    });
});

// GET a single student by ID
router.get("/students/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
});

// PUT to update a student by ID
router.put("/students/:id", async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
});

// DELETE a student by ID
router.delete("/students/:id", async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student deleted" });
});

module.exports = router;
