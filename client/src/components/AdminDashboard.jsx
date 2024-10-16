import React, { useState } from 'react';
import { FaUserCheck, FaUsers, FaPoll, FaPlusCircle, FaCogs, FaBell, FaChartBar } from 'react-icons/fa';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('dashboard');

  // Dummy data for dashboard
  const [stats, setStats] = useState({
    totalVoters: 1200,
    ongoingElections: 3,
    upcomingElections: 5,
    recentActivities: [
      'User John Doe registered',
      'Election results updated for "City Council Elections"',
      'New candidate registered: Jane Doe for President',
    ],
  });

  const [regions, setRegions] = useState({
    counties: ['Nairobi', 'Mombasa', 'Kisumu'],
    constituencies: ['Westlands', 'Langata', 'Nyando'],
    wards: ['Kileleshwa', 'Karen', 'Kisumu East'],
  });

  const [positions, setPositions] = useState(['President', 'Governor', 'Senator', 'MP']);
  const [upcomingElections, setUpcomingElections] = useState(['Presidential Election', 'County Elections']);
  
  const [candidates, setCandidates] = useState([
    { name: 'Jane Doe', position: 'President', election: 'Presidential Election', region: 'Nairobi' },
  ]);

  const handleNavClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Static Navbar */}
      <nav className="bg-gray-900 text-white p-4 shadow-md z-10 mt-4">
        <div className="flex space-x-4 justify-center">
          <button onClick={() => handleNavClick('dashboard')} className="hover:text-yellow-400">Dashboard</button>
          <button onClick={() => handleNavClick('manage-regions')} className="hover:text-yellow-400">Manage Regions</button>
          <button onClick={() => handleNavClick('register-candidate')} className="hover:text-yellow-400">Register a Candidate</button>
          <button onClick={() => handleNavClick('create-election')} className="hover:text-yellow-400">Create an Election</button>
          <button onClick={() => handleNavClick('add-assistant')} className="hover:text-yellow-400">Add an Assistant</button>
        </div>
      </nav>

      {/* Conditionally Rendered Sections */}
      {selectedSection === 'dashboard' && (
        <section className="mt-6">
          <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              <FaUserCheck className="text-3xl mb-2" />
              <h2 className="text-2xl font-bold">{stats.totalVoters}</h2>
              <p>Registered Voters</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow-md">
              <FaPoll className="text-3xl mb-2" />
              <h2 className="text-2xl font-bold">{stats.ongoingElections}</h2>
              <p>Ongoing Elections</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
              <FaUsers className="text-3xl mb-2" />
              <h2 className="text-2xl font-bold">{stats.upcomingElections}</h2>
              <p>Upcoming Elections</p>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
          <ul className="list-disc ml-6">
            {stats.recentActivities.map((activity, index) => (
              <li key={index} className="mb-2">{activity}</li>
            ))}
          </ul>
        </section>
      )}

      {selectedSection === 'manage-regions' && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Manage Regions</h2>
          {/* Add County */}
          <form className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Add County</h3>
            <input type="text" placeholder="Enter county name" className="border p-2 rounded-lg w-full mb-2" />
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Add County</button>
          </form>

          {/* Add Constituency */}
          <form className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Add Constituency</h3>
            <select className="border p-2 rounded-lg w-full mb-2">
              <option value="">Select County</option>
              {regions.counties.map((county, index) => <option key={index} value={county}>{county}</option>)}
            </select>
            <input type="text" placeholder="Enter constituency name" className="border p-2 rounded-lg w-full mb-2" />
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">Add Constituency</button>
          </form>

          {/* Add Ward */}
          <form>
            <h3 className="text-xl font-semibold mb-2">Add Ward</h3>
            <select className="border p-2 rounded-lg w-full mb-2">
              <option value="">Select County</option>
              {regions.counties.map((county, index) => <option key={index} value={county}>{county}</option>)}
            </select>
            <select className="border p-2 rounded-lg w-full mb-2">
              <option value="">Select Constituency</option>
              {regions.constituencies.map((constituency, index) => <option key={index} value={constituency}>{constituency}</option>)}
            </select>
            <input type="text" placeholder="Enter ward name" className="border p-2 rounded-lg w-full mb-2" />
            <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">Add Ward</button>
          </form>
        </section>
      )}

      {selectedSection === 'register-candidate' && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Register a Candidate</h2>
          <form>
            <input type="text" placeholder="Enter candidate name" className="border p-2 rounded-lg w-full mb-2" />
            <label className="block mb-2">Position:</label>
            <select className="border p-2 rounded-lg w-full mb-2">
              {positions.map((position, index) => <option key={index} value={position}>{position}</option>)}
            </select>
            <label className="block mb-2">Select Upcoming Election:</label>
            <select className="border p-2 rounded-lg w-full mb-2">
              {upcomingElections.map((election, index) => <option key={index} value={election}>{election}</option>)}
            </select>
            <div className="border p-2 rounded-lg w-full mb-2 bg-gray-200">
              <label className="block mb-2">Region:</label>
              <span className="font-bold">Nairobi</span> {/* Default value, non-editable */}
            </div>
            <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">Register Candidate</button>
          </form>
        </section>
      )}

      {selectedSection === 'create-election' && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Create an Election</h2>
          <form>
            <input type="text" placeholder="Enter election name" className="border p-2 rounded-lg w-full mb-2" />
            <select className="border p-2 rounded-lg w-full mb-2">
              <option value="">Select Election Type</option>
              <option value="general">General Election</option>
              <option value="individual">Individual Position Election</option>
            </select>
            <input type="date" className="border p-2 rounded-lg w-full mb-2" />
            <button className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700">Create Election</button>
          </form>
        </section>
      )}

      {selectedSection === 'add-assistant' && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Add an Assistant</h2>
          <form>
            <input type="text" placeholder="Enter assistant's name" className="border p-2 rounded-lg w-full mb-2" />
            <input type="email" placeholder="Enter assistant's email" className="border p-2 rounded-lg w-full mb-2" />
            <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">Add Assistant</button>
          </form>
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;
