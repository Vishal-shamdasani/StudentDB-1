import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async (page = 1, limit = 10) => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/students?page=${page}&limit=${limit}`);
      setStudents(result.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Student List</h1>
      {students.map(student => (
        <div key={student._id}>{student.name}</div>
      ))}
    </div>
  );
};

export default StudentList;
