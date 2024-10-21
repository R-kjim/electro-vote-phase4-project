import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';

const ResultsDashboard = () => {
  const [selectedElection, setSelectedElection] = useState("");
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [filteredCandidates,setFilteredCandidates]=useState(null)
  const [selectedPosition,setSelectedPosition]=useState("President")
  const [totalVotes,setTotalVotes]=useState(0)
  const [leader,setLeader]=useState()
  const [electionType,setElectionType]=useState("")
  const positions = ["President",'Governor', 'Senator', 'MP', 'MCA'];

  const value=useContext(AppContext)
  const elections=value.elections
   //filter elections data to show only selected election and closed elections
   const closedElections=elections.filter((election)=>{return election.status==="Closed"})
   const filteredElection=elections.filter((election)=>{
    
    return election.name===selectedElection
  })

  useEffect(()=>{
    if(filteredElection[0] && filteredElection[0].candidates.length>0){
      setElectionType(filteredElection[0].type)
      if(filteredElection[0].type!=="General"){setSelectedPosition(filteredElection[0].type)}
      const filteredCandidates=filteredElection[0].candidates.filter((candidate)=>{return (candidate.position===selectedPosition)})
      setFilteredCandidates(filteredCandidates)
      let x=0
      let lead=0
      let leadId=0
      for(let item of filteredCandidates){
        if(item.votes.length>lead){leadId=item.id}
        x+=item.votes.length
      }
      setTotalVotes(x)
      setLeader(leadId)
    }
  },[selectedElection,selectedPosition])
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Election Dropdown */}
      <div className="mb-4">
        <select value={selectedElection} onChange={(e) => setSelectedElection(e.target.value)} className="p-2 border rounded-md w-full">
          <option value="">Select Election</option>
          {closedElections.map((election,index)=>{return (<option key={index} value={election.name}>{election.name}</option>)})}
        </select>
        {electionType==="General" && <div className="flex space-x-3 mt-2">
                {positions.map((position,index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedPosition(position)}
                        className="flex-grow px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                        {position}
                    </button>
                ))}
        </div>}
      </div>

        
      {/* Filter Section */}
      {/* <div className="flex justify-between mb-6 space-x-4">
        <select value={selectedCounty} onChange={(e) => setSelectedCounty(e.target.value)} className="p-2 border rounded-md">
          <option value="">County: Select</option>
        </select>
        <select value={selectedConstituency} onChange={(e) => setSelectedConstituency(e.target.value)} className="p-2 border rounded-md">
          <option value="">Constituency: Select</option>
        </select>
        <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} className="p-2 border rounded-md">
          <option value="">Ward: Select</option>
        </select>
      </div> */}

      {/* Candidates Results Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-md">
        {filteredCandidates && <table className="min-w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4">Name</th>
              <th className="p-4">Party</th>
              <th className="p-4">% of Votes</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate) => (
              <tr key={candidate.id} className="border-b">
                <td className="p-4">
                <img 
                    src={`${candidate.image_url}`} 
                    alt={`${candidate.voter.user.name}`} 
                    className="w-12 h-12 rounded-full mr-7" 
                />
                <span>{candidate.voter.user.name}</span>
                </td>
                <td className="p-4">{candidate.party}</td>
                <td className="p-4">
                  <div className="flex items-center">
                    <div
                      className={`h-4 ${candidate.id === leader ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${(candidate.votes.length/totalVotes)*100}%` }}
                    ></div>
                    <span className="ml-2">{((candidate.votes.length/totalVotes)*100).toFixed(2)}%</span>
                  </div>
                </td>
              </tr>
             ))}
           </tbody>
        </table> }
      </div>
    </div>
  );
};

export default ResultsDashboard;
