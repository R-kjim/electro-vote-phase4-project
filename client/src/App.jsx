import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import LoginSignup from './components/LoginSignup';
import Navbar from './components/Navbar';

const App = () => {
  const [isAdminAvailable, setIsAdminAvailable] = useState(false);

  useEffect(() => {
    // Simulate a check for admin availability (this would normally be from a backend or local storage)
    // Placeholder for real check: set this dynamically based on actual data
    const adminExists = true; // Replace this with actual logic to check if admin exists
    setIsAdminAvailable(adminExists);
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route 
          path="/login-signup" 
          element={<LoginSignup isAdminAvailable={isAdminAvailable} />} 
        />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default App;
