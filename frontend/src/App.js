import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';  // Use NavLink instead of href
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';

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
            style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white' })}  // Highlight active route
          >
            Home
          </Button>
          <Button 
            color="inherit"
            component={NavLink} 
            to="/add-student" 
            style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white' })}  // Highlight active route
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
