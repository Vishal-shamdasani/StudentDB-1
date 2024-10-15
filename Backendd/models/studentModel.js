const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: String,
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
        enum: ["A", "B", "C", "D", "F"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Student = new mongoose.model("Student", studentSchema);
module.exports = Student;
