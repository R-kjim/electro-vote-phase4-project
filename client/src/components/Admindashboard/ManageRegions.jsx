import React, { useContext, useState } from 'react'
import { AppContext } from '../../../AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import DisplayRegions from './DisplayRegions'

const ManageRegions = () => {
  const value=useContext(AppContext)
  const subNav=value.subNav
  const navigate=useNavigate()
  const [countyName,setCountyName]=useState("")
  const [constituency,setConstituency]=useState({
    county:"",
    name:''
  })
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
        navigate(`/admin/dashboard/${value.userId}`)
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
        navigate(`/admin/dashboard/${value.userId}`)
      return res.json()}else{
        return res.json().then(errorData=>{
          toast.error(errorData.error[0])
        })
    }
    })
    event.target.reset()
  }
  //functions to handle add ward
  const setAddWard=value.setAddWard
  const addWardData=value.addWardData
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
        navigate(`/admin/dashboard/${value.userId}`)
        return res.json()
      }else{
        return res.json().then(errorData=>{
          toast.error(errorData.error[0])
        })
      }
    })
    event.target.reset()
  }
  return (
    <div>
      {subNav==="View Region" && 
      <><DisplayRegions /></>
    //    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
    //    <h2 className="text-2xl font-bold mb-4">Regions</h2>
       
    //    <div className="mb-6">
    //      <label className="block text-gray-700">Filter by County</label>
    //      {/* <select
    //        className="mt-1 block w-full p-2 border rounded-lg"
    //        value={selectedCounty}
    //        onChange={(e) => {
    //          setSelectedCounty(e.target.value);
    //          setSelectedConstituency('');
    //          setSelectedWard('');
    //        }}
    //      >
    //        <option value="">Select County</option>
    //        {counties.map((county, index) => (
    //          <option key={index} value={county}>
    //            {county}
    //          </option>
    //        ))}
    //      </select> */}
    //    </div>
 
    //    <div className="mb-6">
    //      <label className="block text-gray-700">Filter by Constituency</label>
    //      {/* <select
    //        className="mt-1 block w-full p-2 border rounded-lg"
    //        value={selectedConstituency}
    //        onChange={(e) => {
    //          setSelectedConstituency(e.target.value);
    //          setSelectedWard('');
    //        }}
    //      >
    //        <option value="">Select Constituency</option>
    //        {constituencies.map((constituency, index) => (
    //          <option key={index} value={constituency}>
    //            {constituency}
    //          </option>
    //        ))}
    //      </select> */}
    //    </div>
 
    //    <div className="mb-6">
    //      <label className="block text-gray-700">Filter by Ward</label>
    //      {/* <select
    //        className="mt-1 block w-full p-2 border rounded-lg"
    //        value={selectedWard}
    //        onChange={(e) => setSelectedWard(e.target.value)}
    //      >
    //        <option value="">Select Ward</option>
    //        {wards.map((ward, index) => (
    //          <option key={index} value={ward}>
    //            {ward}
    //          </option>
    //        ))}
    //      </select> */}
    //    </div>
 
    //    <div className="overflow-x-auto">
    //      <table className="min-w-full bg-white border rounded-lg shadow-md">
    //        <thead>
    //          <tr className="bg-gray-200 text-gray-700">
    //            <th className="p-4 border">ID</th>
    //            <th className="p-4 border">County</th>
    //            <th className="p-4 border">Constituency</th>
    //            <th className="p-4 border">Ward</th>
    //          </tr>
    //        </thead>
    //        {/* <tbody>
    //          {filteredRegions.length > 0 ? (
    //            filteredRegions.map(region => (
    //              <tr key={region.id} className="hover:bg-gray-100">
    //                <td className="p-4 border">{region.id}</td>
    //                <td className="p-4 border">{region.county}</td>
    //                <td className="p-4 border">{region.constituency}</td>
    //                <td className="p-4 border">{region.ward}</td>
    //              </tr>
    //            ))
    //          ) : (
    //            <tr>
    //              <td colSpan="4" className="p-4 text-center text-gray-500">No regions found.</td>
    //            </tr>
    //          )}
    //        </tbody> */}
    //      </table>
    //    </div>
    //  </div>
        }
     {subNav==="Edit Region" && <section className="mb-6">
           <h2 className="text-2xl font-bold mb-4">Manage Regions</h2>
           {/* Add County */}
           <form className="mb-4" onSubmit={addCountyFn}>
             <h3 className="text-xl font-semibold mb-2">Add County</h3>
             <input type="text" placeholder="Enter county name" className="border p-2 rounded-lg w-full mb-2" onChange={(e)=>setCountyName(e.target.value)} required/>
             <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Add County</button>
           </form>

           {/* Add Constituency */}
           <form className="mb-4" onSubmit={addConstituencyFn}>
             <h3 className="text-xl font-semibold mb-2">Add Constituency</h3>
             <select className="border p-2 rounded-lg w-full mb-2" name='county' onChange={handleConstituency} required>
               <option value="">Select County</option>
               {value.regions.counties.map((county, index) => <option key={index} >{county.name}</option>)}
             </select>
             <input type="text" placeholder="Enter constituency name" className="border p-2 rounded-lg w-full mb-2" name='name' value={constituency.name} onChange={handleConstituency} required/>
             <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">Add Constituency</button>
           </form>

           {/* Add Ward */}
           <form onSubmit={addWardFn}>
             <h3 className="text-xl font-semibold mb-2">Add Ward</h3>
             <select className="border p-2 rounded-lg w-full mb-2" 
            name='county'
            onChange={handleWard}
            required
            >
              <option value="">Select County</option>
              {value.regions.counties.map((county, index) => <option key={index} >{county.name}</option>)}
            </select>
            {addWardData.county!=="" &&(
              <select className="border p-2 rounded-lg w-full mb-2"
            name='constituency'
            onChange={handleWard}
            required
            >
              <option value="">Select Constituency</option>
              {value.filteredConstituencies[0]?
                <>{value.filteredConstituencies[0].constituencies.map((constituency, index) => {return (<option key={index} value={constituency.name}>{constituency.name}</option>)})}:
                </>
                :null
            }
            </select>
          )}
            <input type="text" placeholder="Enter ward name" className="border p-2 rounded-lg w-full mb-2" 
            name='name'
            onChange={handleWard}
            required
            />
            <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700">Add Ward</button>
          </form>
      </section>}
    </div>
  )
}

export default ManageRegions
