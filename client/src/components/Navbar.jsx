import React, { useContext, useState } from 'react';
import { AppContext } from '../../AppContext';
import {Link} from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const value=useContext(AppContext)
  const setIsRegistering=value.setIsRegistering
  const isLoggedIn=value.loginStatus
  return (
    <nav className="bg-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-2xl font-bold">
              Electra-Vote
            </Link>
            <p className="text-sm text-gray-200">Building Democracy</p>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:text-orange-400">
                Home
              </Link>
              <Link to="/results" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:text-orange-400">
                View Results
              </Link>
             { isLoggedIn?
             <><Link to="/" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:text-orange-400" onClick={()=>{localStorage.removeItem("userId") 
             value.setLoginStatus(false)}}>
             Logout
            </Link></>:
             <><Link to="/login" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:text-orange-400" onClick={()=>setIsRegistering(true)}>
             Register
           </Link>
           <Link to="/login" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:text-orange-400" onClick={()=>setIsRegistering(false)}>
             Login
           </Link></>}
              
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-white px-3 py-2 rounded-md text-base font-medium hover:text-orange-400">
              Home
            </Link>
            <Link to="/results" className="block text-white px-3 py-2 rounded-md text-base font-medium hover:text-orange-400">
              View Results
            </Link>
            {isLoggedIn?
            <><Link to="/" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:text-orange-400" onClick={()=>{localStorage.removeItem("userId")
              value.setLoginStatus(false)
            }}>
            Logout
           </Link></>
            :<><Link to="/login" className="block text-white px-3 py-2 rounded-md text-base font-medium hover:text-orange-400" onClick={()=>setIsRegistering(true)}>
              Register
            </Link>
            <Link to="/login" className="block text-white px-3 py-2 rounded-md text-base font-medium hover:text-orange-400">
              Login
            </Link></>}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
