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

    const activeClassName = 'bg-primary font-bold px-5 py-1'

    return (
        <>
            <div className="fixed top-0 left-0 min-w-[200px] min-h-screen bg-white flex flex-col items-start font-display py-2 gap-3">

                <NavLink to={'/admin'} className={({ isActive }) => isActive ? activeClassName : undefined} end>
                    <p>Dashboard</p>
                </NavLink>
                <NavLink to={'orders'} className={({ isActive }) => isActive ? activeClassName : undefined}>Orders</NavLink>

                <div className="flex flex-col gap-2">
                    <p className='cursor-pointer' onClick={() => { setIsActive(!isActive) }}>Manage Products</p>

                    <div className={`flex flex-col gap-2 ${isActive ? 'max-h-[100px]' : 'max-h-0'} overflow-hidden transition-all duration-200 ease-in-out`}>
                        <NavLink to={'collections'} className={({ isActive }) => isActive ? activeClassName : undefined}>Collections</NavLink>
                        <NavLink to={'products'} className={({ isActive }) => isActive ? activeClassName : undefined}>Products</NavLink>
                        <NavLink to={'inventory'} className={({ isActive }) => isActive ? activeClassName : undefined}>Inventory</NavLink>
                    </div>
                </div>

                <button className='mt-auto' onClick={handleLogout}>Logout</button>


            </div>
            <div className="ml-[200px] font-display min-h-screen py-3 px-5 bg-[#F6F6F7] flex flex-col">
                <Outlet />
            </div>
        </>
    )
}

export default AdminNavbar