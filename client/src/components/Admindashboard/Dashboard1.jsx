import React, { useContext, useState } from 'react';
import { AppContext } from '../../../AppContext';
import { FaPoll, FaUserCheck, FaUsers } from 'react-icons/fa';

const Dashboard1 = () => {
  const value = useContext(AppContext);

  // Filtering elections based on status
  const filteredOngoing = value.elections.filter((election) => election.status === "Ongoing");
  const filterPending = value.elections.filter((election) => election.status === "Pending");

  // State variable to track the visible section
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    // Toggle the clicked section and hide others
    setActiveSection(prevSection => (prevSection === section ? null : section));
  };

  return (
    <div>
      <section className="mt-6">
        <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Registered Voters */}
          <div
            className="bg-blue-100 p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => toggleSection('voters')}
          >
            <FaUserCheck className="text-3xl mb-2" />
            <h2 className="text-2xl font-bold">{value.voters.length}</h2>
            <p>Registered Voters</p>
          </div>

          {/* Ongoing Elections */}
          <div
            className="bg-green-100 p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => toggleSection('ongoing')}
          >
            <FaPoll className="text-3xl mb-2" />
            <h2 className="text-2xl font-bold">{filteredOngoing.length}</h2>
            <p>Ongoing Elections</p>
          </div>

          {/* Upcoming Elections */}
          <div
            className="bg-yellow-100 p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => toggleSection('upcoming')}
          >
            <FaUsers className="text-3xl mb-2" />
            <h2 className="text-2xl font-bold">{filterPending.length}</h2>
            <p>Upcoming Elections</p>
          </div>
        </div>

        {/* Conditionally render section details */}
        <div>
          {activeSection === 'voters' && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Registered Voters:</h3>
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">National ID</th>
                    <th className="py-2 px-4 border">Registration Date</th>
                    <th className="py-2 px-4 border">County</th>
                    <th className="py-2 px-4 border">Constituency</th>
                    <th className="py-2 px-4 border">Ward</th>
                  </tr>
                </thead>
                <tbody>
                  {value.voters.map((voter, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border">{voter.user.name}</td> 
                      <td className="py-2 px-4 border">{voter.national_id}</td> {/* Get voters national id */} 
                      <td className="py-2 px-4 border">{new Date(voter.registration_date).toLocaleDateString()}</td> {/*Get voters registration date*/}
                      <td className="py-2 px-4 border">{voter.county.name}</td> {/*Get county voter belongs to*/}
                      <td className="py-2 px-4 border">{voter.constituency.name}</td> {/*Get constituency voter belongs to*/}
                      <td className="py-2 px-4 border">{voter.ward.name}</td> {/*Get ward voter belongs to*/}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeSection === 'ongoing' && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Ongoing Elections:</h3>
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Election Name</th>
                    <th className="py-2 px-4 border">Type</th>
                    <th className="py-2 px-4 border">Status</th>
                    <th className="py-2 px-4 border">Date</th>
                    <th className="py-2 px-4 border">Region</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOngoing.map((election) => (
                    <tr key={election.id}>
                      <td className="py-2 px-4 border">{election.name}</td>   {/*Get the name of the election*/}
                      <td className="py-2 px-4 border">{election.type}</td>   {/*Get the type of the election*/}
                      <td className="py-2 px-4 border">{election.status}</td> {/*Get the status of the election*/}
                      <td className="py-2 px-4 border">{new Date(election.date).toLocaleDateString()}</td> {/*Get the date of the election*/}
                      <td className="py-2 px-4 border">{election.region}</td> {/*Get the region of the election*/}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeSection === 'upcoming' && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Upcoming Elections:</h3>
              <ul>
                {filterPending.map((election) => (
                  <li key={election.id}>{election.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard1;
