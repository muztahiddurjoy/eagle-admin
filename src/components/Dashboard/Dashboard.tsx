import React from "react"
import { Link } from "react-router-dom"

const Dashboard = ({children}:React.PropsWithChildren) => {
  return (
    <div>
        <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content min-h-[100vh]">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button btn-sm lg:hidden m-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>

    </label>
    <div className="p-3 md:p-5">  
        {children}
    </div>
    
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content [&>*]:my-1">
      {/* Sidebar content here */}
      <li>
        <Link to="/">Basic Info</Link>
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/">Basic Info</Link>
      </li>
      <li>
        <Link to="/">Basic Info</Link>
      </li>
    </ul>
  
  </div>
        </div>
    </div>
  )
}

export default Dashboard