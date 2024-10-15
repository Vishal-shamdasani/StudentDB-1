import React, { useState } from "react";
import axios from "axios";
import "./AddStudent.css"; // Ensure this CSS file exists

const AddStudent = () => {
    const [student, setStudent] = useState({
        name: "",
        age: "",
        class: "",
        grade: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({
            ...student,
            [name]: name === "age" ? Number(value) : value, // Ensure age is a number
        });
        setError(""); // Clear error on input change
    };

    const validateForm = () => {
        const { name, age, class: studentClass, grade } = student;
        if (!name || !age || !studentClass || !grade) {
            return "All fields are required.";
        }
        if (isNaN(age) || age <= 0) {
            return "Age must be a valid number greater than 0.";
        }
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        console.log("Form submitted:", student); // Log data being sent

        try {
            // Ensure REACT_APP_API_URL is set in the .env file
            const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5001/api"; // Fallback to localhost if env is missing

            // Log the exact payload sent
            console.log("Sending the following data to the server:", {
                name: student.name,
                age: student.age,
                class: student.class,
                grade: student.grade,
            });

            const response = await axios.post(`${apiUrl}/students`, {
                name: student.name,
                age: student.age,
                class: student.class,
                grade: student.grade,
            });
            console.log("Student added:", response.data);
            // Optionally, reset the form or redirect
            setStudent({ name: "", age: "", class: "", grade: "" }); // Resetting the form
        } catch (error) {
            console.error("Error adding student:", error.response ? error.response.data : error.message);
            setError("An error occurred while adding the student. Please try again.");
        }
    };

    return (
        <div className="add-student">
            <h2>Add Student</h2>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={student.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"  // Added autocomplete attribute
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={student.age}
                    onChange={handleChange}
                    required
                    autoComplete="age"  // Added autocomplete attribute
                />
                <input
                    type="text"
                    name="class"
                    placeholder="Class"
                    value={student.class}
                    onChange={handleChange}
                    required
                    autoComplete="off"  // Disable autocomplete for class field
                />
                <input
                    type="text"
                    name="grade"
                    placeholder="Grade"
                    value={student.grade}
                    onChange={handleChange}
                    required
                    autoComplete="off"  // Disable autocomplete for grade field
                />
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
};

export default AddStudent;
