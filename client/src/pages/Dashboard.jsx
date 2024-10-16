import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { UserIcon, CheckCircleIcon, ExclamationCircleIcon, CalendarIcon, ChartBarIcon, DocumentIcon } from '@heroicons/react/outline';
import { AppContext } from '../../AppContext';
import { Link, Outlet, useParams } from 'react-router-dom';

const Dashboard = () => {
    const value=useContext(AppContext)
    let params=useParams()
    params=params.id
    useEffect(()=>{
       value.setParam(params)
    },[])
  // Dummy user data for now
  const user = {
    name: "John Doe",
    isVoter: true, // Change this to true to see the registered voter state
  };

  const userData=value.userData
  const isRegisteredVoter=value.isRegisteredVoter
  return (
    <div className="container mx-auto p-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center">
          <UserIcon className="h-12 w-12 text-white mr-4" />
          <div>
            <h1 className="text-4xl font-bold">Welcome, {userData.name}!</h1>
            <p className="mt-2">
              {isRegisteredVoter
                ? "Thank you for being a registered voter!"
                : "Complete your registration to vote in upcoming elections."}
            </p>
          </div>
        </div>
      </div>

      {/* User Status */}
      <div className="mt-8">
        {isRegisteredVoter ? (
          <div className="flex items-center bg-green-500 p-4 rounded-lg shadow-md">
            <CheckCircleIcon className="h-8 w-8 text-white mr-4" />
            <div>
              <h2 className="text-2xl font-semibold text-white">You're a Registered Voter</h2>
              <p className="text-white mt-1">You can participate in upcoming elections and view your voting history below.</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center bg-yellow-400 p-4 rounded-lg shadow-md">
            <ExclamationCircleIcon className="h-8 w-8 text-black mr-4" />
            <div>
              <h2 className="text-2xl font-semibold">Complete Your Registration</h2>
              <p className="mt-1">You need to complete your registration to vote in upcoming elections.</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"><Link to='/dashboard/update-details' >
                Complete Registration
              </Link></button>
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Elections */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming Elections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample elections */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center">
            <CalendarIcon className="h-10 w-10 text-indigo-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Presidential Election</h3>
              <p className="mt-2 text-gray-600">Date: 20th November 2024</p>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center">
            <CalendarIcon className="h-10 w-10 text-indigo-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Local Referendum</h3>
              <p className="mt-2 text-gray-600">Date: 5th December 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Election Results */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Election Results</h2>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center">
          <ChartBarIcon className="h-10 w-10 text-green-500 mr-4" />
          <div>
            <h3 className="text-xl font-semibold">Last Presidential Election</h3>
            <p className="mt-2 text-gray-600">Winner: Jane Doe - 65%</p>
          </div>
        </div>
      </div>

      {/* User Actions */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Actions</h2>
        <div className="flex space-x-4">
          {isRegisteredVoter ? (
            <>
              <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                <DocumentIcon className="h-6 w-6 mr-2" />
                View Voting History
              </button>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                <UserIcon className="h-6 w-6 mr-2" />
                Update Registration
              </button>
            </>
          ) : (
            <Link to='/dashboard/update-details' className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              <UserIcon className="h-6 w-6 mr-2" />
              Complete Voter Registration
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
