import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudent = () => {
  const { id } = useParams();  // Use the student's _id from the URL
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    age: '',
    class: '',
    grade: '',
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/students/${id}`);
        setStudent(response.data);  // Make sure response.data is the student object
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/students/${id}`, student);
      navigate('/');  // Redirect to the student list after successful edit
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
