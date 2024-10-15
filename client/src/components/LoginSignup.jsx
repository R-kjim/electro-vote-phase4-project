import React, { useState, useEffect } from 'react';
import '../App.css'; // Import the CSS file

const LoginSignup = ({ isAdminAvailable }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('User'); // State to track selected role
  const [file, setFile] = useState(null); // State for file upload

  // Toggle between login and signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Handle file upload change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Update state with selected file
  };

  // Handle role selection change
  const handleRoleChange = (event) => {
    setRole(event.target.value); // Update role state based on user selection
  };

  return (
    <div className="login-signup-container">

      {/* Role selection */}
      <label htmlFor="role">Register as:</label>
            <select id="role" value={role} onChange={handleRoleChange}>
              <option value="User">User</option>
              {/* Disable Admin option if an admin already exists */}
              <option value="Admin" disabled={isAdminAvailable}>Admin</option>
            </select>
            {isAdminAvailable && <p className="admin-warning">Admin is already registered</p>}

      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form>
        {!isLogin && ( // Display the registration fields only when signing up
          <>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            {/* Instruction text for file upload */}
            <p className="upload-instruction">Upload National ID</p>
            <input 
              type="file" 
              accept=".jpg, .jpeg, .png" // Accept image file formats
              onChange={handleFileChange} 
              required 
            />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />

            
          </>
        )}
        {isLogin && (
          <>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
          </>
        )}
        <button type="submit" className="logbtn">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <button onClick={toggleForm} className="toggle-button">
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default LoginSignup;
