import React, { createContext, useState } from 'react'



export const AppContext=createContext()

const AppContextProvider = (props) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [loginStatus,setLoginStatus]=useState(true)
    const [userData,setUserData]=useState([])


    const value={
        isRegistering, setIsRegistering,userData,setUserData
        // loginStatus,setLoginStatus

    }
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider >
  )
}

export default AppContextProvider
