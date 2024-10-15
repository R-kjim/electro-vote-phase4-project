import React, { useState } from 'react';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        {!isLogin && (
          <>
            <input type="text" placeholder="Full Name" required />
            <input type="password" placeholder="Confirm Password" required />
          </>
        )}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <button onClick={toggleForm}>
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default LoginSignup;
