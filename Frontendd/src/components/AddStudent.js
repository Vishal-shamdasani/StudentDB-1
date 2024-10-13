import React, { useState } from 'react';
import axios from 'axios';
import './AddStudent.css'; // Make sure this CSS file exists

const AddStudent = () => {
    const [student, setStudent] = useState({
        name: '',
        age: '',
        class: '',
        grade: '',
    });

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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/students`, student);
            console.log('Student added:', response.data);
            // Optionally, reset the form or redirect
            setStudent({ name: '', age: '', class: '', grade: '' }); // Resetting the form
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    return (
        <div className="add-student">
            <h2>Add Student</h2>
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
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
};

export default AddStudent;
