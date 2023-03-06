import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { auth } from '../firebase';

const Navbar = () => {
   const user = auth.currentUser;
  return (
    <>

    <div className="flex flex-row justify-between items-center px-5 py-5 bg-primary">
        <NavLink to='/' className='text-2xl'>
            Sinagtala
        </NavLink>

        <div className="flex flex-row gap-20 text-base">
            <NavLink to='collections'> Collections </NavLink>
            <NavLink to='shop'> Shop </NavLink>
            <NavLink to='about'> About Us </NavLink>
            {user ?  <NavLink to='profile'> Profile </NavLink> : <NavLink to='login'> Login / Register </NavLink> }
        </div>
    </div>
    <Outlet/>
    </>

  )
}

export default Navbar
