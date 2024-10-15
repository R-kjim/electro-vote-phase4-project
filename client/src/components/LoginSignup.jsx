import React, { useState } from 'react';

const LoginSignup = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      // Handle registration logic here
      console.log('Registering:', formData);
    } else {
      // Handle login logic here
      console.log('Logging in:', formData);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isRegistering ? 'Register' : 'Login'}
      </h2>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {isRegistering && (
          <div className="mb-4">
            <label className="block text-gray-700">Repeat Password</label>
            <input
              type="password"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md font-semibold"
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isRegistering ? 'Already have an account?' : "Don't have an account?"}
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-blue-700 font-semibold ml-1"
        >
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default LoginSignup;
