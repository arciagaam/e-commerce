import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AdminNavbar = () => {
    const navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const { role } = JSON.parse(localStorage.getItem('user'));
            if (role == 0) {
                navigate('/');
            }
        } else {
            navigate('/');
        }
    }, [])

    const handleLogout = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            localStorage.setItem('message', 'User logged out.');
            location.reload();
        })
            .catch((err) => {
                console.log(err);
            })
    }

    const activeClassName = 'font-bold px-5 py-1 text-accent-default border-l-4 border-accent-default'

    return (
        <>
            <div className="fixed top-0 left-0 min-w-[200px] min-h-screen bg-white flex flex-col items-start font-display py-2 gap-3 text-accent-dark">

                <NavLink to={'/admin'} className={({ isActive }) => isActive ? activeClassName : 'px-5'} end>
                    <p>Dashboard</p>
                </NavLink>
                <NavLink to={'orders'} className={({ isActive }) => isActive ? activeClassName : 'px-5'}>Orders</NavLink>

                <div className="flex flex-col gap-2">
                    <p className='cursor-pointer px-5' onClick={() => { setIsActive(!isActive) }}>Manage Products</p>

                    <div className={`flex flex-col gap-2 ${isActive ? 'max-h-[100px]' : 'max-h-0'} overflow-hidden transition-all duration-200 ease-in-out`}>
                        <NavLink to={'collections'} className={({ isActive }) => isActive ? activeClassName : 'px-8'}>Collections</NavLink>
                        <NavLink to={'products'} className={({ isActive }) => isActive ? activeClassName : 'px-8'}>Products</NavLink>
                        <NavLink to={'inventory'} className={({ isActive }) => isActive ? activeClassName : 'px-8'}>Inventory</NavLink>
                    </div>
                </div>

                <button className='mt-auto px-5' onClick={handleLogout}>Logout</button>


            </div>
            <div className="ml-[200px] font-display min-h-screen py-3 px-5 bg-[#f0f0f0] flex flex-col text-accent-dark">
                <Outlet />
            </div>
        </>
    )
}

export default AdminNavbar