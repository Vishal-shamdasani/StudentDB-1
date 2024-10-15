import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(""); // For error handling

    // Fetch students from the API
    const fetchStudents = async () => {
        setLoading(true); // Show loading state
        setError(""); // Reset error before fetching
        try {
            const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5001/api";
            console.log("Fetching students from:", apiUrl); // Debug API URL
            const result = await axios.get(`${apiUrl}/students`);
            console.log("Students fetched:", result.data.students); // Debug response data
            
            if (result.data.students && Array.isArray(result.data.students)) {
                setStudents(result.data.students); // Ensure we set the students array
            } else {
                console.error("Invalid response format:", result.data);
                setError("Invalid data received from the server.");
            }
        } catch (error) {
            console.error("Error fetching students:", error);
            setError("Failed to fetch students. Please try again later.");
        } finally {
            setLoading(false); // Stop loading state
        }
    };

    // Delete a student by ID
    const deleteStudent = async (id) => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5001/api";
            await axios.delete(`${apiUrl}/students/${id}`);
            setStudents(students.filter((student) => student._id !== id)); // Remove the deleted student from the state
        } catch (error) {
            console.error("Error deleting student:", error);
            setError("Failed to delete student. Please try again.");
        }
    };

    useEffect(() => {
        fetchStudents(); // Fetch students when the component loads
    }, []);

    return (
        <div>
            <h1>Student List</h1>
            {loading ? (
                <p>Loading students...</p> // Show loading message while fetching
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p> // Show error message if there's an issue
            ) : students && students.length > 0 ? (
                students.map((student) => (
                    <div key={student._id} style={{ marginBottom: '20px' }}>
                        <h3>{student.name}</h3>
                        <p>Age: {student.age}</p>
                        <p>Class: {student.class}</p>
                        <p>Grade: {student.grade}</p>

                        {/* Edit button that links to the EditStudent page */}
                        <Link to={`/edit-student/${student._id}`}>
                            <button>Edit</button>
                        </Link>

                        {/* Delete button */}
                        <button 
                            onClick={() => deleteStudent(student._id)} 
                            style={{ 
                                marginLeft: '10px', 
                                backgroundColor: 'red', 
                                color: 'white', 
                                border: 'none', 
                                padding: '8px 12px', 
                                cursor: 'pointer' 
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))
            ) : (
                <p>No students available</p> // Show if no students are available
            )}
        </div>
    );
};

export default StudentList;
