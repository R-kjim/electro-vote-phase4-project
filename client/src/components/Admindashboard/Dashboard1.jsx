import React, { useContext } from 'react'
import { AppContext } from '../../../AppContext'
import { FaPoll, FaUserCheck, FaUsers } from 'react-icons/fa'

const Dashboard1 = () => {
  const value=useContext(AppContext)
  const filteredOngoing=value.elections.filter((election)=>{
    return(
      election.status==="Active"
    )
  })
  const filterPending=value.elections.filter((election)=>{
    return (election.status==="Pending")
  })
  return (
    <div>
      <section className="mt-6">
          <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              <FaUserCheck className="text-3xl mb-2" />
              <h2 className="text-2xl font-bold">{value.voters.length}</h2>
              <p>Registered Voters</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow-md">
              <FaPoll className="text-3xl mb-2" />
              <h2 className="text-2xl font-bold">{filteredOngoing.length}</h2>
              <p>Ongoing Elections</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
              <FaUsers className="text-3xl mb-2" />
              <h2 className="text-2xl font-bold">{filterPending.length}</h2>
              <p>Upcoming Elections</p>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
          {/* <ul className="list-disc ml-6">
            {stats.recentActivities.map((activity, index) => (
              <li key={index} className="mb-2">{activity}</li>
            ))}
          </ul> */}
        </section>
    </div>
  )
}

export default Dashboard1
