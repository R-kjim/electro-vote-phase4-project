import React, { createContext, useEffect, useState } from 'react'



export const AppContext=createContext()

const AppContextProvider = (props) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [loginStatus,setLoginStatus]=useState(false)
    const [userData,setUserData]=useState([])
    const [param,setParam]=useState(null)
    const [isRegisteredVoter, setIsRegisteredVoter] = useState(false)
    const [regions,setRegions]=useState([])
    const [elections,setElections]=useState([])
    const [voters,setVoters]=useState([])
    const [filteredConstituencies,setConstituencies]=useState([])
    const [addWardData,setAddWard]=useState({county:"",constituency:"",name:""})

    const userId=localStorage.getItem("userId")

    //fetch functionalities
    useEffect(()=>{
        //fetch user data
        fetch(`http://127.0.0.1:5555/user/${userId}`)
        .then(res=>res.json())
        .then(data=>{setUserData(data)
            if(data.voter.length>0){
                setIsRegisteredVoter(true)
            }
        })
        //fetch regions data
        fetch("http://127.0.0.1:5555/get-boundaries")
        .then(res=>res.json())
        .then(data=>setRegions(data))

        //fetch elections
        fetch("http://127.0.0.1:5555/elections")
        .then(res=>res.json())
        .then(data=>setElections(data))

        //fetch voters data
        fetch("http://127.0.0.1:5555/voters")
        .then(res=>res.json())
        .then(data=>setVoters(data))

    },[userId])
    //update data used in other pages once userData is updated
    useEffect(()=>{
      if(addWardData.county!==""){
      const filteredConstituencies=value.regions.counties.filter((region)=>{
        return region.name===addWardData.county
      })

      setConstituencies(filteredConstituencies)
    }
    },[addWardData])
    const value={
        isRegistering, setIsRegistering,userData,setUserData,param,setParam,
        isRegisteredVoter, setIsRegisteredVoter,regions,setRegions,userId,
        loginStatus,setLoginStatus,elections,voters,filteredConstituencies,
        addWardData,setAddWard

    }
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider >
  )
}

export default AppContextProvider
