import React, { useContext, useEffect, useState } from 'react';
import { FaUserCheck, FaUsers, FaPoll, FaPlusCircle, FaCogs, FaBell, FaChartBar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AppContext } from '../../AppContext';
import AdminNavbar from './Admindashboard/AdminNavbar';
import Dashboard1 from './Admindashboard/Dashboard1';
import { Outlet } from 'react-router-dom';
import LoadingPage from '../pages/LoadingPage';

const AdminDashboard = () => {
const value=useContext(AppContext)
const allCandidateNames = value.voters

//State variables for section visibility
const [showVoters, setShowVoters] = useState(false);
const [showOngoing, setShowOngoing] = useState(false);
const [showUpcoming, setShowUpcoming] = useState(false);

const [selectedElection,setSelectedElection]=useState([])
const [candidate,setCandidate]=useState({})
const[region,setRegion]=useState("")
const [candidateName, setCandidateName] = useState('');
const [candidateSuggestions, setCandidateSuggestions] = useState([]);
const[candidateData, setCandidateData]=useState({
  election:"",
  position:"",
  name:"",
  region:region
})
let regions=value.regions
// Filter name suggestions for a candidate
const handleNameInputChange = (e) => {
  const value = e.target.value;
  setCandidateName(value);

  // Filter suggestions based on the input value
  if (value) {
    const suggestions = allCandidateNames.filter(name1 => 
      name1.user.name.toLowerCase().includes(value.toLowerCase())
    );
    setCandidateSuggestions(suggestions);
  } else {
    setCandidateSuggestions([]);
  }
};

const handleNameSuggestionClick = (suggestion) => {
  setCandidateName(suggestion);
  setCandidateSuggestions([]); // Hide suggestions after selection
};

  const [selectedSection, setSelectedSection] = useState('dashboard');
  const [electionForm,setElectionForm]=useState({
    name:"",
    type:"",
    region:"",
    election_date:""
  })
  const [countyName,setCountyName]=useState("")
  const [constituency,setConstituency]=useState({
    county:"",
    name:''
  })
  //context data
  const [positions, setPositions] = useState(['President', 'Governor', 'Senator', 'MP',"MCA"]);

  //filter elections status
  //ongoing/active elections
  const filteredOngoing=value.elections.filter((election)=>{
    return(
      election.status==="Active"
    )
  })
  //upcoming elections
  const filterPending=value.elections.filter((election)=>{
    return (election.status==="Pending")
  })

  const handleNavClick = (section) => {
    setSelectedSection(section);
  };
  //function to handle add county
  function addCountyFn(event){
    event.preventDefault()
    fetch("http://127.0.0.1:5555/county",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({"name":countyName})
    }).then(res=>{
      if(res.ok){
        toast.success(`${countyName} County added successfully`)
        return res.json()
      }else{
        return res.json().then(errorData=>{
          toast.error(errorData.error[0])
        })
      }
    })
    event.target.reset()
  }
  //function to handle add constituency
  const handleConstituency = (e) => {
    const { name, value } = e.target;
    setConstituency({
      ...constituency,
      [name]: value,
    });
  };
  function addConstituencyFn(event){
    event.preventDefault()
    fetch("http://127.0.0.1:5555/constituency",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(constituency)
    })
    .then(res=>{
      if (res.ok){toast.success(`${constituency.name} constituency added successfully`)
      return res.json()}else{
        return res.json().then(errorData=>{
          toast.error(errorData.error[0])
        })
    }
    })
    event.target.reset()
  }
  const setAddWard=value.setAddWard
  const addWardData=value.addWardData
  //functions to handle add ward
  function handleWard(e){
    const {name,value}=e.target
    setAddWard({
      ...addWardData,
      [name]:value
    })
  }
  function addWardFn(event){
    event.preventDefault()
    fetch("http://127.0.0.1:5555/ward",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(addWardData)
    })
    .then(res=>{
      if(res.ok){toast.success("Ward added successfully")
        return res.json()
      }else{
        return res.json().then(errorData=>{
          toast.error(errorData.error[0])
        })
      }
    })
    event.target.reset()
  }
  //function to handle changes in election form
  function handleChangeElection(event){
    const {name,value}=event.target
    setElectionForm({
      ...electionForm,
      [name]:value,
    })
  }
  //function to handle create election
  function createElectionFn(event){
    event.preventDefault()
    fetch("http://127.0.0.1:5555/elections",{
      method:"POST",
      body:JSON.stringify(electionForm),
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(res=>{
      if(res.ok){toast.success("Election added successfully")
        return res.json()
      }else{
        return res.json().then(errorData=>{
          toast.error(errorData.error[0])
        })
      }
    })
  }
  //use effect to handle data flexibility
  useEffect(()=>{
    if(candidateData.election!==""){
      let item1={}
      for(let item of filterPending){
        if(item.name===candidateData.election){
          item1=item
          setSelectedElection(item)
        }
      }
      if(item1.type!=="General"){setPositions([item1.type])}

    }    if(candidate.user){

    if(candidateData.position==="President"){setRegion("Countrywide")}
    else if(candidateData.position==="Governor"){setRegion(candidate.county.name)}
    else if(candidateData.position=="Senator"){setRegion(candidate.county.name)}
    else if(candidateData.position=="MP"){setRegion(candidate.constituency.name)}
    else if(candidateData.position==="MCA"){setRegion(candidate.ward.name)}
  }
    // else{setRegion("---")}
  },[candidateData])
  
  function handleAddCandidate(event){
    const {name,value}=event.target
    setCandidateData({
      ...candidateData,
      [name]:value,
    })
  }
  // function addCandidateFn(event){
  //   event.preventDefault()
  //   candidateData.name=candidate.national_id
  //   candidateData.region=region
  //   fetch("http://127.0.0.1:5555/candidates",{
  //     method:"POST",
  //     headers:{
  //       "Content-Type":"application/json"
  //     },
  //     body:JSON.stringify(candidateData)
  //   })
  //   .then(res=>{
  //     if(res.ok){toast.success("Candidate added successfully")
  //       return(res.json())
  //     }else{
  //       return res.json().then(errorData=>{
  //         toast.error(errorData.error[0])
  //       })
  //     }
  //   })
  //   event.target.reset()
  // }
  function addCandidateFn(event){
    event.preventDefault();
    candidateData.name = candidate.national_id; // Map voter id
    candidateData.region = region; // Set the region
  
    fetch("http://127.0.0.1:5555/candidates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(candidateData)
    })
    .then(res => {
      if (res.ok) {
        toast.success("Candidate added successfully");
        return res.json();
      } else {
        return res.json().then(errorData => {
          toast.error(errorData.error[0]);
        });
      }
    })
    .catch(err => {
      toast.error("An error occurred. Please try again.");
    });
  
    event.target.reset();
  }
  
  return (
    <>{!value.userData.name?
      <><LoadingPage /></>:
      <>
      <AdminNavbar />
      {/* <Dashboard1 /> */}
      <Outlet />
      </>
//     <div className="container mx-auto p-6">
//       {/* Static Navbar */}
//       <nav className="bg-gray-900 text-white p-4 shadow-md z-10 mt-4">
//         <div className="flex space-x-4 justify-center">
//           <button onClick={() => handleNavClick('dashboard')} className="hover:text-yellow-400">Dashboard</button>
//           <button onClick={() => handleNavClick('manage-regions')} className="hover:text-yellow-400">Manage Regions</button>
//           <button onClick={() => handleNavClick('register-candidate')} className="hover:text-yellow-400">Register a Candidate</button>
//           <button onClick={() => handleNavClick('create-election')} className="hover:text-yellow-400">Create an Election</button>
//           <button onClick={() => handleNavClick('add-assistant')} className="hover:text-yellow-400">Add an Assistant</button>
//         </div>
//       </nav>

//       {/* Conditionally Rendered Sections */}
//       {selectedSection === 'dashboard' && (
//         <section className="mt-6">
//           <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div className="bg-blue-100 p-4 rounded-lg shadow-md">
//               <FaUserCheck className="text-3xl mb-2" />
//               <h2 className="text-2xl font-bold">{value.voters.length}</h2>
//               <p>Registered Voters</p>
//             </div>
//             <div className="bg-green-100 p-4 rounded-lg shadow-md">
//               <FaPoll className="text-3xl mb-2" />
//               <h2 className="text-2xl font-bold">{filteredOngoing.length}</h2>
//               <p>Ongoing Elections</p>
//             </div>
//             <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
//               <FaUsers className="text-3xl mb-2" />
//               <h2 className="text-2xl font-bold">{filterPending.length}</h2>
//               <p>Upcoming Elections</p>
//             </div>
//           </div>
//           <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
//           {/* <ul className="list-disc ml-6">
//             {stats.recentActivities.map((activity, index) => (
//               <li key={index} className="mb-2">{activity}</li>
//             ))}
//           </ul> */}
//         </section>
//       )}

//       {selectedSection === 'manage-regions' && (
//         <section className="mb-6">
//           <h2 className="text-2xl font-bold mb-4">Manage Regions</h2>
//           {/* Add County */}
//           <form className="mb-4" onSubmit={addCountyFn}>
//             <h3 className="text-xl font-semibold mb-2">Add County</h3>
//             <input type="text" placeholder="Enter county name" className="border p-2 rounded-lg w-full mb-2" onChange={(e)=>setCountyName(e.target.value)} required/>
//             <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Add County</button>
//           </form>

//           {/* Add Constituency */}
//           <form className="mb-4" onSubmit={addConstituencyFn}>
//             <h3 className="text-xl font-semibold mb-2">Add Constituency</h3>
//             <select className="border p-2 rounded-lg w-full mb-2" name='county' onChange={handleConstituency} required>
//               <option value="">Select County</option>
//               {value.regions.counties.map((county, index) => <option key={index} >{county.name}</option>)}
//             </select>
//             <input type="text" placeholder="Enter constituency name" className="border p-2 rounded-lg w-full mb-2" name='name' value={constituency.name} onChange={handleConstituency} required/>
//             <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">Add Constituency</button>
//           </form>

//           {/* Add Ward */}
//           <form onSubmit={addWardFn}>
//             <h3 className="text-xl font-semibold mb-2">Add Ward</h3>
//             <select className="border p-2 rounded-lg w-full mb-2" 
//             name='county'
//             onChange={handleWard}
//             required
//             >
//               <option value="">Select County</option>
//               {value.regions.counties.map((county, index) => <option key={index} >{county.name}</option>)}
//             </select>
//             {addWardData.county!=="" &&(
//               <select className="border p-2 rounded-lg w-full mb-2"
//             name='constituency'
//             onChange={handleWard}
//             required
//             >
//               <option value="">Select Constituency</option>
//               {value.filteredConstituencies[0]?
//                 <>{value.filteredConstituencies[0].constituencies.map((constituency, index) => {return (<option key={index} value={constituency.name}>{constituency.name}</option>)})}:
//                 </>
//                 :null
//             }
//             </select>
//           )}
//             <input type="text" placeholder="Enter ward name" className="border p-2 rounded-lg w-full mb-2" 
//             name='name'
//             onChange={handleWard}
//             required
//             />
//             <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">Add Ward</button>
//           </form>
//         </section>
//       )}

// {selectedSection === 'register-candidate' && (
//   // <section className="mb-6">
//   //   <h2 className="text-2xl font-bold mb-4">Register a Candidate</h2>
//   //   <form onSubmit={addCandidateFn}>
//   //     {/* Select Upcoming Election */}
//   //     <label className="block mb-2">Select Upcoming Election:</label>
//   //     <select className="border p-2 rounded-lg w-full mb-2" name="election" onChange={handleAddCandidate} required>
//   //       <option value="">Select an Election</option>
//   //       {filterPending.map((election, index) => (
//   //         <option key={index} value={election.name}>{election.name}</option>
//   //       ))}
//   //     </select>

//   //     {/* Select Position */}
//   //     <label className="block mb-2">Position:</label>
//   //     <select className="border p-2 rounded-lg w-full mb-2" name="position" onChange={handleAddCandidate} required>
//   //       <option>Select Position</option>
//   //       {positions.map((position, index) => (
//   //         <option key={index} value={position}>{position}</option>
//   //       ))}
//   //     </select>

//   //     {/* Candidate Name with hidden dropdown */}
//   //     <label className="block mb-2">Candidate Name:</label>
//   //     <input 
//   //       type="text" 
//   //       placeholder="Start typing candidate name" 
//   //       className="border p-2 rounded-lg w-full mb-2" 
//   //       onChange={(e) => handleNameInputChange(e)} 
//   //       value={candidateName}
//   //       required
//   //     />
      
//   //     {candidateName && candidateSuggestions.length > 0 && (
//   //       <ul className="border p-2 rounded-lg w-full mb-2 bg-white shadow-lg">
//   //         {candidateSuggestions.map((suggestion, index) => (
//   //           <li 
//   //             key={index} 
//   //             onClick={() => {
//   //               handleNameSuggestionClick(suggestion.user.name)
//   //               setCandidate(candidateSuggestions[index])
//   //             }
                
//   //            }
//   //             className="p-2 hover:bg-gray-100 cursor-pointer"
//   //           >
//   //             {suggestion.user.name}
//   //           </li>
//   //         ))}
//   //       </ul>
//   //     )}

//   //     {/* Non-editable Region */}
//   //     <div className="border p-2 rounded-lg w-full mb-2 bg-gray-200">
//   //       <label className="block mb-2">Region:</label>
//   //       <span className="font-bold">{region}</span> {/* Default value, non-editable */}
//   //     </div>

//   //     {/* Register Candidate Button */}
//   //     <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
//   //       Register Candidate
//   //     </button>
//   //   </form>
//   // </section>
//   <section className="mb-6">
//   <h2 className="text-2xl font-bold mb-4">Register a Candidate</h2>
//   <form onSubmit={addCandidateFn}>
    
//     {/* Select Upcoming Election */}
//     <label className="block mb-2">Select Upcoming Election:</label>
//     <select className="border p-2 rounded-lg w-full mb-2" name="election" onChange={handleAddCandidate} required>
//       <option value="">Select an Election</option>
//       {filterPending.map((election, index) => (
//         <option key={index} value={election.name}>{election.name}</option>
//       ))}
//     </select>

//     {/* Select Position */}
//     <label className="block mb-2">Position:</label>
//     <select className="border p-2 rounded-lg w-full mb-2" name="position" onChange={handleAddCandidate} required>
//       <option>Select Position</option>
//       {positions.map((position, index) => (
//         <option key={index} value={position}>{position}</option>
//       ))}
//     </select>

//     {/* Candidate Name with hidden dropdown */}
//     <label className="block mb-2">Candidate Name:</label>
//     <input 
//       type="text" 
//       placeholder="Start typing candidate name" 
//       className="border p-2 rounded-lg w-full mb-2" 
//       onChange={(e) => handleNameInputChange(e)} 
//       value={candidateName}
//       required
//     />
//     {candidateName && candidateSuggestions.length > 0 && (
//       <ul className="border p-2 rounded-lg w-full mb-2 bg-white shadow-lg">
//         {candidateSuggestions.map((suggestion, index) => (
//           <li 
//             key={index} 
//             onClick={() => {
//               handleNameSuggestionClick(suggestion.user.name)
//               setCandidate(candidateSuggestions[index])
//             }}
//             className="p-2 hover:bg-gray-100 cursor-pointer"
//           >
//             {suggestion.user.name}
//           </li>
//         ))}
//       </ul>
//     )}

//     {/* Non-editable Region */}
//     <div className="border p-2 rounded-lg w-full mb-2 bg-gray-200">
//       <label className="block mb-2">Region:</label>
//       <span className="font-bold">{region}</span> {/* Default value, non-editable */}
//     </div>

//     {/* New fields for Political Party, Description, and Image URL */}
    
//     {/* Political Party */}
//     <label className="block mb-2">Political Party:</label>
//     <input 
//       type="text" 
//       name="party" 
//       placeholder="Enter Political Party" 
//       className="border p-2 rounded-lg w-full mb-2" 
//       onChange={handleAddCandidate} 
//       value={candidateData.party || ""} 
//       required
//     />

//     {/* Candidate Description */}
//     <label className="block mb-2">Description:</label>
//     <textarea 
//       name="description" 
//       placeholder="Enter Candidate Description" 
//       className="border p-2 rounded-lg w-full mb-2" 
//       onChange={handleAddCandidate} 
//       value={candidateData.description || ""} 
//       rows={4}
//       required
//     />

//     {/* Image URL */}
//     <label className="block mb-2">Image URL:</label>
//     <input 
//       type="text" 
//       name="image_url" 
//       placeholder="Enter Image URL" 
//       className="border p-2 rounded-lg w-full mb-2" 
//       onChange={handleAddCandidate} 
//       value={candidateData.image_url || ""} 
//     />

//     {/* Register Candidate Button */}
//     <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
//       Register Candidate
//     </button>
//   </form>
// </section>

// )}


//       {selectedSection === 'create-election' && (
//         <section className="mb-6">
//           <h2 className="text-2xl font-bold mb-4">Create an Election</h2>
//           <form onSubmit={createElectionFn}>
//             <input type="text" placeholder="Enter election name" className="border p-2 rounded-lg w-full mb-2" 
//             name='name'
//             value={electionForm.name}
//             onChange={handleChangeElection}
//             required/>
//             <select className="border p-2 rounded-lg w-full mb-2"
//             name='type'
//             value={electionForm.type}
//             onChange={handleChangeElection}
//             required>
//               <option value="">Select Election Type</option>
//               <option value="General">General Election</option>
//               {['President', 'Governor', 'Senator', 'MP',"MCA"].map((choice)=>{
//                 return (
//                   <option value={choice}>{choice}</option>
//                 )
//               })}
//             </select>
//            { electionForm.type!=="" &&  electionForm.type!=="General" && electionForm.type!=="President"?
//             <select className="border p-2 rounded-lg w-full mb-2"
//             name='region'
//             value={electionForm.type}
//             onChange={handleChangeElection}
//             // required
//             >
//               <option value="">Select {electionForm.type==="Senator"?"County":electionForm.type==="Governor"?"County":electionForm.type==="MP"?"Constituency":"Ward"}</option>
//               <>
//               {electionForm.type==="Senator"? 
//                 regions.counties.map((county)=>{return(<option>{county.name}</option>)})
//               :
//               electionForm.type==="Governor"? 
//                 regions.counties.map((county)=>{return(<option>{county.name}</option>)})
//               :electionForm.type==="MP"?
//               regions.constituencies.map((county)=>{return(<option>{county.name}</option>)}):           
//               regions.constituencies.map((county)=>{return(
//                 county.wards.map((ward)=>{return(<option>{ward.name}</option>)})
//               )})
//             }
//               </>
//             </select>:null
//           }
//             <input type="date" className="border p-2 rounded-lg w-full mb-2" 
//             name='election_date'
//             value={electionForm.election_date}
//             onChange={handleChangeElection}
//             required/>
//             <button className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700">Create Election</button>
//           </form>
//         </section>
//       )}

//       {selectedSection === 'add-assistant' && (
//         <section className="mb-6">
//           <h2 className="text-2xl font-bold mb-4">Add an Assistant</h2>
//           <form>
//             <input type="text" placeholder="Enter assistant's name" className="border p-2 rounded-lg w-full mb-2" />
//             <input type="email" placeholder="Enter assistant's email" className="border p-2 rounded-lg w-full mb-2" />
//             <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">Add Assistant</button>
//           </form>
//         </section>
//       )}
//     </div>
      
    // :<>Loading ..</>
    }
    </>
  );
};

export default AdminDashboard;
