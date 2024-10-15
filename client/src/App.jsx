import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import LoginSignup from './components/LoginSignup';
import ElectionResults from './pages/ElectionResults';


const App = () => {
  const [isAdminAvailable, setIsAdminAvailable] = useState(false);

  useEffect(() => {
    // Simulate a check for admin availability (this would normally be from a backend or local storage)
    // Placeholder for real check: set this dynamically based on actual data
    const adminExists = true; // Replace this with actual logic to check if admin exists
    setIsAdminAvailable(adminExists);
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route 
          path="/login" 
          element={<LoginSignup />} 
        />
        <Route path='elections-results' element={<ElectionResults />}/>
      </Routes>
    </div>
  );
};

export default App;
