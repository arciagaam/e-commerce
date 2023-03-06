import { data } from 'autoprefixer';
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

const Navbar = () => {
  return (
    <>

    <div className="flex flex-row justify-between items-center px-5 py-5">

        <NavLink to='/' className='text-2xl'>
            Sinagtala
        </NavLink>

        <div className="flex flex-row gap-20 text-base">
            <NavLink to='collections'>
               Collections
            </NavLink>
            <NavLink to='shop'>
               Shop
            </NavLink>
            <NavLink to='about'>
               About Us
            </NavLink>
            <NavLink to='profile'>
               Profile
            </NavLink>
            <NavLink to='login'>
               Login
            </NavLink>
        </div>

    </div>
    <Outlet/>
    </>

  )
}

export default Navbar
