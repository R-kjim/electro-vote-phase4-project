import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Ensure this file is created

const Navbar = () => {
  return (
    <nav className="custom-navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/elections-results">Election Results</Link></li>
        <li><Link to="/login-signup">Login/Signup</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
