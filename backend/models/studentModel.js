const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,  // Changed from String to Number
        required: true,
        min: 1,
    },
    class: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        required: true,
        enum: ["A", "B", "C", "D", "E", "F"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
