import React, { useContext, useState } from 'react';
import { AppContext } from '../../../AppContext';

const CandidatesAvailable = () => {
    const value=useContext(AppContext)
    const candidates1=value.candidates
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
    const [showActions,setShowActions]=useState()
    const [show,setShow]=useState(false)
  // Function to handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const candidates=candidates1.filter((candidate)=>{
    if(searchTerm===""){return true}
    else{return candidate.voter.user.name.toLowerCase().includes(searchTerm.toLowerCase())}
  })
  // Calculate total pages
  const candidatesPerPage = 10;
  const totalPages = Math.ceil(candidates.length / candidatesPerPage);

  // Get current candidates for the page
  const startIndex = (currentPage - 1) * candidatesPerPage;
  const currentCandidates = candidates.slice(startIndex, startIndex + candidatesPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Candidates Available</h2>
      
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search candidate name..."
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded-l"
        />
        {/* <button className="bg-blue-500 text-white  rounded-r">
          <i className="fas fa-filter">Filter</i> {/* Placeholder for filter icon */}
        {/* </button> */} 
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Region</th>
            <th className="p-3 border">Position</th>
            <th className="p-3 border">Party</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td className="p-3 border flex items-center">
                <img 
                    src={candidate.image_url} // Ensure this matches your data property
                    alt={`${candidate.voter.user.name}`} 
                    className="w-12 h-12 rounded-full mr-7" // Added margin-right for spacing
                />
                <span>{candidate.voter.user.name}</span> {/* Display the candidate's name */}
            </td>
                <td className="p-3 border">{candidate.position==="President"?"Countrywide":candidate.region}</td>
              <td className="p-3 border">{candidate.position}</td>
              <td className="p-3 border">{candidate.party}</td>
              <td className="p-3 border">
                <div className="relative inline-block text-left">
                  <div>
                  <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                        aria-expanded="true"
                        aria-haspopup="true"
                        onClick={()=>{setShowActions(candidate.id)
                            setShow(!show)}
                        }
                    >
                        Actions
                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                  </div>
                  {/* Dropdown for actions */}
                  {showActions===candidate.id && show&& <div className=" absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    {/* <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu"> */}
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        View
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        Edit
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        Delete
                      </a>
                    {/* </div> */}
                  </div> }
                </div> 
              </td>
            </tr>
            
          

          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="mr-2 bg-blue-500 text-white p-2 rounded"
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidatesAvailable;
