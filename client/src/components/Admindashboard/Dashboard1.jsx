import React, { useContext, useState } from 'react';
import { AppContext } from '../../../AppContext';
import { FaPoll, FaUserCheck, FaUsers } from 'react-icons/fa';

const Dashboard1 = () => {
  const value = useContext(AppContext);

  // Filtering elections based on status
  const filteredOngoing = value.elections.filter((election) => election.status === "Ongoing");
  const filterPending = value.elections.filter((election) => election.status === "Pending");
console.log(filteredOngoing)
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
              <h3 className="text-lg font-semibold">Registered Voters:</h3>
              <ul>
                {value.voters.map((voter,index) => (
                  <li key={index}>{voter.user.name}</li>
                ))}
              </ul>
            </div>
          )}

          {activeSection === 'ongoing' && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Ongoing Elections:</h3>
              <ul>
                {filteredOngoing.map((election) => (
                  <li key={election.id}>{election.name}</li>
                ))}
              </ul>
            </div>
          )}

          {activeSection === 'upcoming' && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Upcoming Elections:</h3>
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
