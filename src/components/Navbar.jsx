import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
const Navbar = () => {

  const [user, setUser] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(localStorage.getItem('user'));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const { role } = JSON.parse(localStorage.getItem('user'));
      if (role == 0) {
        navigate('/');
      } else {
        navigate('/admin');
      }
    }
  }, [])

  return (
    <>
      <div className="flex flex-row justify-between items-center px-5 py-5 bg-primary font-display">
        <NavLink to='/' className='text-2xl'>
          Sinagtala
        </NavLink>

        <div className="flex flex-row gap-20 text-base">
          <NavLink to='collections'> Collections </NavLink>
          <NavLink to='shop'> Shop </NavLink>
          <NavLink to='about'> About Us </NavLink>
          {user ? <NavLink to='profile'> Profile </NavLink> : <NavLink to='login'> Login / Register </NavLink>}
        </div>
      </div>
      <div className='font-display min-h-screen flex flex-col'>
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default Navbar
