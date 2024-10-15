import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = true; // Placeholder, change based on user authentication state

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isLoggedIn ? (
          <>
            <li><Link to="/elections">Elections</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </>
        ) : (
          <li><Link to="/login-signup">Login/Signup</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
