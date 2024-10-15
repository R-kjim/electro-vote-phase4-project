
import React, { useState } from 'react';
import '../App.css'; // Import the CSS file

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [file, setFile] = useState(null); // State for file upload

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Update state with selected file
  };

  return (
    <div className="login-signup-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form>
        {!isLogin && ( // Display the registration fields only when not logging in
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
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <button onClick={toggleForm} className="toggle-button">
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default LoginSignup;
