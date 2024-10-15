import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import LoginSignup from './components/LoginSignup';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default App;