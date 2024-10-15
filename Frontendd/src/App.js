import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
          <Button color="inherit" href="/">
            Home
          </Button>
          <Button color="inherit" href="/add-student">
            Add Student
          </Button>
          {/* Remove the static Edit Student button */}
          <Button color="inherit" href="/delete-student">
            Delete Student
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '40px' }}>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/edit-student/:id" element={<EditStudent />} />  {/* Keep the dynamic route for editing */}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
