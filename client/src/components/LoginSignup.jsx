import React, { useContext, useState } from 'react';
import { AppContext } from '../../AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const value=useContext(AppContext)
  const isRegistering=value.isRegistering
  const setIsRegistering=value.setIsRegistering

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      if(formData.password!==formData.repeatPassword){
        toast.error("Passwords do not match")
      }else{
        fetch("http://127.0.0.1:5555/signup",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(formData)
        }).then(res=>{
          if(res.ok){
            toast.success("Registration successful. Proceed to login")
            setIsRegistering(false)
            return res.json()
          }else{
            return res.json().then(errorData=>{
              toast.error(errorData.error[0])
            })
          }
        })
        .then(data=>console.log(data))
        .catch(error=>console.log(error))
      }
    } else {
      const loginData={"email":formData.email,"password":formData.password}
      fetch("http://127.0.0.1:5555/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(loginData)
      })
      .then(res=>{
        if(res){
          return res.json()
        }
      })
      .then(data=>{
        localStorage.setItem("userId",data.user)
        if(data.role==="Voter"){
        navigate(`/dashboard/user/${localStorage.getItem("userId")}`)
          window.location.reload()
      }
        else if(data.role==="Admin"){
          navigate(`/admin/dashboard/${localStorage.getItem("userId")}`)
          window.location.reload()
        }
      })
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
