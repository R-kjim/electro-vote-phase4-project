import React, { createContext, useEffect, useState } from 'react'



export const AppContext=createContext()

const AppContextProvider = (props) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [loginStatus,setLoginStatus]=useState(false)
    const [userData,setUserData]=useState([])
    const [param,setParam]=useState(null)
    const [isRegisteredVoter, setIsRegisteredVoter] = useState(false)
    const [regions,setRegions]=useState([])
    const userId=localStorage.getItem("userId")
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

    },[userId])

    const value={
        isRegistering, setIsRegistering,userData,setUserData,param,setParam,
        isRegisteredVoter, setIsRegisteredVoter,regions,setRegions,userId,
        loginStatus,setLoginStatus

    }
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider >
  )
}

export default AppContextProvider
