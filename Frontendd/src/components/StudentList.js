import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const StudentList = () => {
    const [students, setStudents] = useState([]);

    // Fetch students from the API
    const fetchStudents = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/students`);
            setStudents(result.data.students);  // Ensure the correct data is set
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    // Delete a student by ID
    const deleteStudent = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/students/${id}`);
            setStudents(students.filter((student) => student._id !== id));  // Remove the deleted student from the state
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    useEffect(() => {
        fetchStudents();  // Fetch students when the component loads
    }, []);

    return (
        <div>
            <h1>Student List</h1>
            {students.length > 0 ? (
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
                <p>No students available</p>
            )}
        </div>
    );
};

export default StudentList;
