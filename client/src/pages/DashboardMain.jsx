import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { AppContext } from '../../AppContext'

const DashboardMain = () => {
    const value=useContext(AppContext)
  return (
    <div>
        {value.loginStatus?
      <Outlet />:null
        }
    </div>
  )
}

export default DashboardMain
