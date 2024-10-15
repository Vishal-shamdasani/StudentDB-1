// src/pages/Home.js
import React, { useState, useEffect } from "react";
import StudentList from "../components/StudentList";

function Home() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch student data from API here
        fetch("http://localhost:5001/api/students")
            .then((res) => res.json())
            .then((data) => setStudents(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="home">
            <h1>Student List</h1>
            <StudentList students={students} />
        </div>
    );
}

export default Home;
