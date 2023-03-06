import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
    const navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const { role } = JSON.parse(localStorage.getItem('user'));
            if (role == 0) {
                navigate('/');
            }
        }
    }, [])

    return (
        <>
            <div className="fixed top-0 left-0 min-w-[150px] min-h-screen bg-primary flex flex-col items-start">

                <NavLink to={'/admin'}>Dashboard</NavLink>
                <NavLink to={'orders'}>Orders</NavLink>

                <div className="flex flex-col">
                    <p className='cursor-pointer' onClick={()=>{setIsActive(!isActive)}}>Manage Products</p>

                    <div className= {`flex flex-col ${isActive ? 'max-h-[100px]' : 'max-h-0'} overflow-hidden transition-all duration-200 ease-in-out`}>
                        <NavLink to={'products'}>Products</NavLink>
                        <NavLink to={'collections'}>Collections</NavLink>
                        <NavLink to={'inventory'}>Inventory</NavLink>
                    </div>
                </div>


            </div>
            <div className="ml-[150px] font-display min-h-screen py-3 px-5">
                <Outlet />
            </div>
        </>
    )
}

export default AdminNavbar