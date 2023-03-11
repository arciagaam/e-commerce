import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { auth, db } from '../firebase';
import { collection, getDocs, getCountFromServer } from 'firebase/firestore';
const Navbar = () => {

  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(localStorage.getItem('user'));

      const getCartCount = async () => {
        const {uid} = JSON.parse(localStorage.getItem('user'));
        const cartRef = collection(db, `users/${uid}/cart`);
        const snapshot = await getCountFromServer(cartRef);
        setCartCount(snapshot.data().count)
      }

      getCartCount();

    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const { role } = JSON.parse(localStorage.getItem('user'));
      if (role == 1) {
        navigate('/admin');
      }
    }
  }, []);
  

  const activeClassName = 'px-5 text-accent-default relative'


  return (
    <>
      <div className="flex flex-row justify-between items-center px-5 py-5 font-display text-accent-dark">
        <NavLink to='/' className='text-2xl'>
          Sinagtala
        </NavLink>

        <div className="flex flex-row gap-20 text-base">
          <NavLink className={({ isActive }) => isActive ? activeClassName : 'hover:text-accent-default px-5'}  to='products'> Shop </NavLink>
          <NavLink className={({ isActive }) => isActive ? activeClassName : 'hover:text-accent-default px-5'} to='about'> About Us </NavLink>
          {user ? <NavLink className={({ isActive }) => isActive ? activeClassName : 'hover:text-accent-default px-5'} to='account'> Profile </NavLink> : <NavLink className={({ isActive }) => isActive ? activeClassName : 'hover:text-accent-default px-5'} to='login'> Login / Register </NavLink>}
          {user ? <NavLink className={({ isActive }) => isActive ? activeClassName : 'hover:text-accent-default px-5 relative'} to='cart'> <p className='absolute rounded-full top-[-15px] right-[3px] bg-accent-default w-[25px] grid place-items-center text-sm'>{cartCount}</p> <p>Cart</p> </NavLink> : null}
        </div>
      </div>
      <div className='font-display min-h-screen flex flex-col text-accent-dark'>
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default Navbar
