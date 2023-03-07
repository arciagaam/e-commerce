import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AdminNavbar = () => {
    const navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if(!auth.user) {
            navigate('/');
        }

        if (localStorage.getItem('user')) {
            const { role } = JSON.parse(localStorage.getItem('user'));
            if (role == 0) {
                navigate('/');
            }
        }
    }, [])

    const handleLogout = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            localStorage.setItem('message', 'User logged out.');
            // location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <div className="fixed top-0 left-0 min-w-[150px] min-h-screen bg-white flex flex-col items-start font-display">

                <NavLink to={'/admin'}>Dashboard</NavLink>
                <NavLink to={'orders'}>Orders</NavLink>

                <div className="flex flex-col">
                    <p className='cursor-pointer' onClick={() => { setIsActive(!isActive) }}>Manage Products</p>

                    <div className={`flex flex-col ${isActive ? 'max-h-[100px]' : 'max-h-0'} overflow-hidden transition-all duration-200 ease-in-out`}>
                        <NavLink to={'products'}>Products</NavLink>
                        <NavLink to={'collections'}>Collections</NavLink>
                        <NavLink to={'inventory'}>Inventory</NavLink>
                    </div>
                </div>

                <button onClick={handleLogout}>Logout</button>


            </div>
            <div className="ml-[150px] font-display min-h-screen py-3 px-5 bg-[#F6F6F7]">
                <Outlet />
            </div>
        </>
    )
}

export default AdminNavbar