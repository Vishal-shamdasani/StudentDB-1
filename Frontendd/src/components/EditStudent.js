import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditStudent.css'; // Make sure this CSS file exists

const EditStudent = ({ match, history }) => {
    const [student, setStudent] = useState({
        name: '',
        age: '',
        class: '',
        grade: '',
    });

    useEffect(() => {
        const fetchStudent = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/students/${match.params.id}`);
            setStudent(response.data);
        };

        fetchStudent();
    }, [match.params.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({
            ...student,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        console.log('Form submitted:', student); // Debugging statement

        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/students/${match.params.id}`, student);
            console.log('Student updated:', response.data);
            // Optionally, redirect back to the student list or reset the form
            history.push('/'); // Redirecting to home or student list
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    return (
        <div className="edit-student">
            <h2>Edit Student</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={student.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={student.age}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="class"
                    placeholder="Class"
                    value={student.class}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="grade"
                    placeholder="Grade"
                    value={student.grade}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Update Student</button>
            </form>
        </div>
    );
};

export default EditStudent;
