// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Student Records</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/add-student">Add Student</Link>
      </div>
    </nav>
  );
}

export default Navbar;
