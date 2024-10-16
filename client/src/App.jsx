import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import LoginSignup from './components/LoginSignup';
import ElectionResults from './pages/ElectionResults';
import Dashboard from './pages/Dashboard';
import ElectionDetails from './components/ElectionDetails'; // Import ElectionDetails
import { AppContext } from '../AppContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isAdminAvailable, setIsAdminAvailable] = useState(false);
  const value = useContext(AppContext);

  useEffect(() => {
    // Simulate a check for admin availability
    const adminExists = true; // Replace this with actual logic to check if admin exists
    setIsAdminAvailable(adminExists);
  }, []);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="elections-results" element={<ElectionResults />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/election-details/:electionId" element={<ElectionDetails />} /> {/* New route for ElectionDetails */}
      </Routes>
    </div>
  );
};

export default App;
