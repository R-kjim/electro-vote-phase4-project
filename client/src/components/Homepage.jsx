import React, { useState, useEffect } from 'react';
import '../App.css'; // Import the CSS file

const Homepage = () => {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    // Fetch available elections from the backend
    // Placeholder data for now
    setElections([
      { id: 1, name: "Presidential Election", status: "Ongoing", hasVoted: false },
      { id: 2, name: "Senate Election", status: "Upcoming", hasVoted: false },
    ]);
  }, []);

  return (
    <div>
      <div className="main-banner">
        <h1> Make you vote count!!</h1>
              </div>

      <section className="main-content">
        <a href="#">
          <img src="registration-icon.png" alt="Registration" />
          <p>Registration</p>
        </a>
        
        <a href="#">
          <img src="election-results-icon.png" alt="Election Results" />
          <p>Election Results</p>
        </a>

        <a href="#">
          <img src="ballot-icon.png" alt="What's on the Ballot" />
          <p>What's on the Ballot</p>
        </a>
       
      </section>

      <h1>Available Elections</h1>
      <ul>
        {elections.map((election) => (
          <li key={election.id}>
            {election.name} - {election.status}
            {election.status === 'Ongoing' && !election.hasVoted && (
              <button>Vote Now</button>
            )}
            {election.hasVoted && <span> (Already Voted)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
