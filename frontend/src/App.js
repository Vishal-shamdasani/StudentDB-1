import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'; 
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';

// Backend URL is still here in case it's needed for other purposes
const backendUrl = 'http://localhost:5001/api'; 

const App = () => {
  return (
    <Router>
      <AppBar position="static" style={{ background: '#1976d2', padding: '10px' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Student Management System
          </Typography>
          <Button
            color="inherit"
            component={NavLink}
            to="/"
            style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white' })}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/add-student"
            style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white' })}
          >
            Add Student
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '40px' }}>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/edit-student/:id" element={<EditStudent />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
