import React, { useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserIcon, CheckCircleIcon, ExclamationCircleIcon, CalendarIcon, ChartBarIcon, DocumentIcon } from '@heroicons/react/outline';
import { AppContext } from '../../AppContext';
import { Link, Outlet, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const value=useContext(AppContext)
  let params=useParams()
  params=params.id
  useEffect(()=>{
       value.setParam(params)
     
      // init()
    },[])
    // function init(){
    //   if(value.userData.voter){
    //     let votes=value.userData.voter[0].vote
    //     const election_count=votes.reduce((acc,current)=>{
    //         const id = current.election_id;
    //         acc[id] = (acc[id] || 0) + 1; // Increment the count for each election_id
    //         // return {[id]:acc[id]};
    //         return acc
    //       },{})
    //   setMyVotes(election_count)
    //   }
    // }
    // init()
  const handleElectionClick = (electionId) => {
    let votes=value.userData.voter[0].vote
        const election_count=votes.reduce((acc,current)=>{
            const id = current.election_id;
            acc[id] = (acc[id] || 0) + 1; // Increment the count for each election_id
            // return {[id]:acc[id]};
            return acc
          },{})
      if(election_count[electionId]){toast.error("You already participated in this election")}
      else{
    navigate(`/election-details/${electionId}`); // Navigate to ElectionDetails with the electionId
  }
  };

  const userData=value.userData
  const isRegisteredVoter=value.isRegisteredVoter
  let upcomingElections=value.elections.filter((election)=>{return election.status==="Pending"})
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
          {upcomingElections.length>0?
            upcomingElections.map((election,index)=>{
              return (
                <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center" onClick={() => 
                  value.isRegisteredVoter?handleElectionClick(election.id):toast.error("Update voter details to participate in an election")}>
            <CalendarIcon className="h-10 w-10 text-indigo-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">{election.name}</h3>
              <p className="mt-2 text-gray-600">Date: {election.election_date}</p>
            </div>
          </div>
              )
            })
          :<p>No upcoming Elections you can participate!</p>}
          {/* <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center" onClick={() => handleElectionClick(2)}>
            <CalendarIcon className="h-10 w-10 text-indigo-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Runoff Election</h3>
              <p className="mt-2 text-gray-600">Date: 5th December 2024</p>
            </div>
          </div> */}
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
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={()=>{
                value.setUpdateStatus(true)
                navigate(`/dashboard/update-details`)
              }}>
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
