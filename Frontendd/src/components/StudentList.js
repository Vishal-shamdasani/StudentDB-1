import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentList = () => {
    const [students, setStudents] = useState([]);

    console.log(students);

    const fetchStudents = async () => {
        try {
            const result = await axios.get(
                `${process.env.REACT_APP_API_URL}/students`
            );

            setStudents(result.data.students);
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
            {students.map((curr) => (
                <div>{curr.name}</div>
            ))}
        </div>
    );
};

export default StudentList;
