import React, { useContext, useState } from 'react'
import { AppContext } from '../../../AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const CreateElection = () => {
  const value=useContext(AppContext)
  const navigate=useNavigate()
  let regions=value.regions
  const [electionForm,setElectionForm]=useState({
    name:"",
    type:"",
    region:"",
    election_date:""
  })
  //function to navigate to dashboard
  function navigates(){
    navigate(`/admin/dashboard/${value.userId}`)
    window.location.reload()
  }
  //function to handle changes in election form
  function handleChangeElection(event){
    const {name,value}=event.target
    setElectionForm({
      ...electionForm,
      [name]:value,
    })
    // console.log()
  }
  console.log(electionForm)
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
        navigates()
        return res.json()
      }else{
        return res.json().then(errorData=>{
          toast.error(errorData.error[0])
        })
      }
    })
  }
  return (
    <div>
      <section className="mb-6">
           <h2 className="text-2xl font-bold mb-4">Create an Election</h2>
           <form onSubmit={createElectionFn}>
             <input type="text" placeholder="Enter election name" className="border p-2 rounded-lg w-full mb-2" 
             name='name'
             value={electionForm.name}
             onChange={handleChangeElection}
             required/>
             <select className="border p-2 rounded-lg w-full mb-2"
             name='type'
             value={electionForm.type}
             onChange={handleChangeElection}
             required>
               <option value="">Select Election Type</option>
               <option value="General">General Election</option>
               {['President', 'Governor', 'Senator', 'MP',"MCA"].map((choice,index)=>{
                 return (
                   <option key={index} value={choice}>{choice}</option>
                 )
               })}
             </select>
            { electionForm.type!=="" &&  electionForm.type!=="General" && electionForm.type!=="President"?
             <select className="border p-2 rounded-lg w-full mb-2"
             name='region'
             onChange={handleChangeElection}
              required
             >
               <option value="">Select {electionForm.type==="Senator"?"County":electionForm.type==="Governor"?"County":electionForm.type==="MP"?"Constituency":"Ward"}</option>
               {electionForm.type==="Senator"? 
                 regions.counties.map((county,index)=>{return(<option key={index}>{county.name}</option>)})
               :
               electionForm.type==="Governor"? 
                 regions.counties.map((county,index)=>{return(<option key={index}>{county.name}</option>)})
               :electionForm.type==="MP"?
               regions.constituencies.map((county,index)=>{return(<option key={index}>{county.name}</option>)}):           
               regions.constituencies.map((county, index)=>{return(
                 county.wards.map((ward,index)=>{return(<option key={index}>{ward.name}</option>)})
               )})
             }
             </select>:null
           }
             <input type="date" className="border p-2 rounded-lg w-full mb-2" 
             name='election_date'
             value={electionForm.election_date}
             onChange={handleChangeElection}
             required/>
             <button className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700">Create Election</button>
           </form>
         </section>
    </div>
  )
}

export default CreateElection
