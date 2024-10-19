import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const counties = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret',
  // Add all 47 counties...
];

const positions = [
  'President',
  'Members of the National Assembly',
  'Senator',
  'Governor',
  'Women Representative',
  'County Assembly Member',
  // Add additional positions...
];

const ResultsDashboard = () => {
  const [selectedCounty, setSelectedCounty] = useState(counties[0]);
  const [selectedCategory, setSelectedCategory] = useState(positions[0]);
  const [candidateData, setCandidateData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch the data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/votes');
        const data = await response.json();
        setCandidateData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCountyChange = (event) => {
    setSelectedCounty(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const generateChartData = (county, category) => {
    if (!candidateData[county] || !candidateData[county][category]) {
      return {
        labels: [],
        datasets: [],
      };
    }

    const labels = candidateData[county][category].map((candidate) => candidate.name);
    const data = candidateData[county][category].map((candidate) => candidate.votes);

    return {
      labels,
      datasets: [
        {
          label: `Votes for ${category} in ${county}`,
          data,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Election Results Dashboard</h1>

      <div className="filter-section mb-6">
        <label htmlFor="county-select" className="mr-2">Select County:</label>
        <select
          id="county-select"
          value={selectedCounty}
          onChange={handleCountyChange}
          className="border rounded-md p-2"
        >
          {counties.map((county) => (
            <option key={county} value={county}>
              {county}
            </option>
          ))}
        </select>

        <label htmlFor="category-select" className="ml-4 mr-2">Select Position:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border rounded-md p-2"
        >
          {positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
      </div>

      <div className="category-section mb-6">
        <h2 className="text-xl font-semibold">{selectedCategory} Results in {selectedCounty}</h2>
        <Bar data={generateChartData(selectedCounty, selectedCategory)} />
      </div>

      <table className="min-w-full bg-white border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Election Name</th>
            <th className="py-2 px-4 border-b">Votes</th>
            <th className="py-2 px-4 border-b">Winner</th>
            <th className="py-2 px-4 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: 1, electionName: 'Presidential Election', votes: 15000, winner: 'Candidate A', date: '2024-10-01' },
            { id: 2, electionName: 'Governor Election', votes: 13000, winner: 'Candidate E', date: '2024-10-01' },
          ].map((result) => (
            <tr key={result.id}>
              <td className="py-2 px-4 border-b">{result.electionName}</td>
              <td className="py-2 px-4 border-b">{result.votes}</td>
              <td className="py-2 px-4 border-b">{result.winner}</td>
              <td className="py-2 px-4 border-b">{new Date(result.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsDashboard;
