import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RegisterCandidate = () => {
  const value=useContext(AppContext)
  const navigate=useNavigate()
  const [positions, setPositions] = useState(['President', 'Governor', 'Senator', 'MP',"MCA"]);
  const [candidateName, setCandidateName] = useState('');
  const[region,setRegion]=useState("")
  const[candidateData, setCandidateData]=useState({
    election:"",
    position:"",
    name:"",
    region:region
  })
  const allCandidateNames = value.voters
  const [candidate,setCandidate]=useState({})

  const [candidateSuggestions, setCandidateSuggestions] = useState([]);
  const handleNameSuggestionClick = (suggestion) => {
    setCandidateName(suggestion);
    setCandidateSuggestions([]); // Hide suggestions after selection
  };
  const [selectedFile,setSelectedFile]=useState(null)
  const [imageUrl,setImageUrl]=useState("")
   //upcoming elections
   const filterPending=value.elections.filter((election)=>{
    return (election.status==="Pending")
  })
  //functions to post a candidate successfully
  function handleAddCandidate(event){
    const {name,value}=event.target
    setCandidateData({
      ...candidateData,
      [name]:value,
    })
  }
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
        navigate(`/admin/dashboard/${value.userId}`)
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
    //use effect to handle data flexibility
    useEffect(()=>{
      // if(candidateData.election!==""){
      //   let item1={}
      //   for(let item of filterPending){
      //     if(item.name===candidateData.election){
      //       item1=item
      //       setSelectedElection(item)
      //     }
      //   }
      //   if(item1.type!=="General"){setPositions([item1.type])}
  
      // }  
        if(candidate.user){
  
      if(candidateData.position==="President"){setRegion("Countrywide")}
      else if(candidateData.position==="Governor"){setRegion(candidate.county.name)}
      else if(candidateData.position=="Senator"){setRegion(candidate.county.name)}
      else if(candidateData.position=="MP"){setRegion(candidate.constituency.name)}
      else if(candidateData.position==="MCA"){setRegion(candidate.ward.name)}
    }
      // else{setRegion("---")}
    },[candidateData])
  // function handleFile(event){
  //   setSelectedFile(event.target.files[0])
  // }
  // const handleUpload = async () => {
  //   const formData = new FormData();
  //   formData.append('image', selectedFile);

  //   try {
  //     const response = await fetch('http://localhost:55555/upload', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     if (data.file_path) {
  //       setImageURL(`http://localhost:5000/${data.file_path}`);
  //     }
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //   }
  // };
  return (
    <div>
       <section className="mb-6">
   <h2 className="text-2xl font-bold mb-4">Register a Candidate</h2>
   <form onSubmit={addCandidateFn}>
    
     {/* Select Upcoming Election */}
     <label className="block mb-2">Select Upcoming Election:</label>
     <select className="border p-2 rounded-lg w-full mb-2" name="election" onChange={handleAddCandidate} required>
       <option value="">Select an Election</option>
       {filterPending.map((election, index) => (
         <option key={index} value={election.name}>{election.name}</option>
       ))}
     </select>

     {/* Select Position */}
     <label className="block mb-2">Position:</label>
     <select className="border p-2 rounded-lg w-full mb-2" name="position" onChange={handleAddCandidate} required>
       <option>Select Position</option>
       {positions.map((position, index) => (
         <option key={index} value={position}>{position}</option>
       ))}
     </select>

     {/* Candidate Name with hidden dropdown */}
     <label className="block mb-2">Candidate Name:</label>
     <input 
       type="text" 
       placeholder="Start typing candidate name" 
       className="border p-2 rounded-lg w-full mb-2" 
       onChange={(e) => handleNameInputChange(e)} 
       value={candidateName}
       required
     />
     {candidateName && candidateSuggestions.length > 0 && (
       <ul className="border p-2 rounded-lg w-full mb-2 bg-white shadow-lg">
         {candidateSuggestions.map((suggestion, index) => (
           <li 
             key={index} 
             onClick={() => {
               handleNameSuggestionClick(suggestion.user.name)
               setCandidate(candidateSuggestions[index])
             }}
             className="p-2 hover:bg-gray-100 cursor-pointer"
           >
             {suggestion.user.name}
           </li>
         ))}
       </ul>
     )}

     {/* Non-editable Region */}
     <div className="border p-2 rounded-lg w-full mb-2 bg-gray-200">
       <label className="block mb-2">Region:</label>
       <span className="font-bold">{region}</span> {/* Default value, non-editable */}
     </div>

     {/* New fields for Political Party, Description, and Image URL */}
    
     {/* Political Party */}
     <label className="block mb-2">Political Party:</label>
     <input 
       type="text" 
       name="party" 
       placeholder="Enter Political Party" 
       className="border p-2 rounded-lg w-full mb-2" 
       onChange={handleAddCandidate} 
       value={candidateData.party || ""} 
       required
     />

     {/* Candidate Description */}
     <label className="block mb-2">Description:</label>
     <textarea 
       name="description" 
       placeholder="Enter Candidate Description" 
       className="border p-2 rounded-lg w-full mb-2" 
       onChange={handleAddCandidate} 
       value={candidateData.description || ""} 
       rows={4}
       required
     />

     {/* Image URL */}
     <label className="block mb-2">Image URL:</label>
     <input 
       type="text" 
       name="image_url" 
       placeholder="Enter Image URL" 
       className="border p-2 rounded-lg w-full mb-2" 
       onChange={handleAddCandidate} 
       value={candidateData.image_url || ""} 
     />
     {/* <input type='file' onChange={handleFile}/>
     <button onClick={handleUpload}>Upload image</button> */}
     {selectedFile &&<img src={imageUrl} alt='image'/>}
     {/* Register Candidate Button */}
     <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
       Register Candidate
     </button>
   </form>
 </section>
    </div>
  )
}

export default RegisterCandidate
