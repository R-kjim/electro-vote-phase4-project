import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import LoadingPage from './LoadingPage'

const DashboardMain = () => {
    const value=useContext(AppContext)
  return (
    <>
    {value.userData.email?<div>
        {/* {value.loginStatus? */}
      <Outlet />
      {/* // :null */}
        {/* } */}
    </div>:<LoadingPage />}
    </>
  )
}

export default DashboardMain
