import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../App.css'; // Import the CSS file
import registration from '../assets/registration.png';
import candidates from '../assets/candidates.png';
import results from '../assets/results.png';

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
        <h1>Make your vote count!</h1>
      </div>

      <section className="main-content">
        <Link to="/login-signup"> {/* Link to LoginSignup.jsx */}
          <img src={registration} alt="Registration" />
          <p>Registration</p>
        </Link>

        <Link to="/election-results"> {/* Link to Election Results page (adjust as needed) */}
          <img src={results} alt="Election Results" />
          <p>Election Results</p>
        </Link>

        <Link to="/candidates"> {/* Link to Candidates page (adjust as needed) */}
          <img src={candidates} alt="What's on the Ballot" />
          <p>What's on the Ballot</p>
        </Link>
      </section>

      
    </div>
  );
};

export default Homepage;
