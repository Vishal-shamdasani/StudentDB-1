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
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error handling

  // Fetch the student details when the component mounts
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5001/api";
        console.log(`Fetching student data from: ${apiUrl}/students/${id}`); // Debug API URL

        const response = await axios.get(`${apiUrl}/students/${id}`);
        console.log("Fetched student details:", response.data);

        // Ensure student data is set properly
        if (response.data && response.data.name) {
          setStudent(response.data); // Pre-fill the form with fetched student data
        } else {
          console.error("Student data not in the correct format:", response.data);
          setError("Failed to load student data.");
        }
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error('Error fetching student:', error);
        setError('Failed to load student data.');
        setLoading(false); // Stop loading even if there is an error
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
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5001/api";
      await axios.put(`${apiUrl}/students/${id}`, student);
      navigate('/');  // Redirect to the student list after successful edit
    } catch (error) {
      console.error('Error updating student:', error);
      setError('Failed to update student. Please try again.');
    }
  };

  return (
    <div className="edit-student">
      <h2>Edit Student</h2>
      {loading ? (
        <p>Loading student details...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={student.name}  // Pre-fill the input with fetched data
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={student.age}  // Pre-fill the input with fetched data
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="class"
            placeholder="Class"
            value={student.class}  // Pre-fill the input with fetched data
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="grade"
            placeholder="Grade"
            value={student.grade}  // Pre-fill the input with fetched data
            onChange={handleChange}
            required
          />
          <button type="submit">Update Student</button>
        </form>
      )}
    </div>
  );
};

export default EditStudent;
