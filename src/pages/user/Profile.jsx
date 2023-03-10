import React, { useEffect } from 'react'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import { useNavigate, NavLink, Outlet } from 'react-router-dom'


const Profile = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('user')){
            navigate('/');
        }
    },[])

    const handleSignOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            localStorage.setItem('message', 'User logged out.');
            location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="flex flex-row columns-2 h-auto px-52 w-full">
            <button onClick={handleSignOut}>Sign Out</button>
            <div className="flex w-1/5 flex-col">
                <NavLink to='manageaccount'>
                    Manage My Account
                </NavLink>
                <NavLink to='myprofile'>
                    My Profile
                </NavLink>
                <NavLink to='addressbook'>
                    Address Book
                </NavLink>
            </div>
            <div className="flex flex-col w-4/5 gap-5">
                <p className='text-2xl'>Manage My Account</p>
                
                <Outlet/>
            </div>
        </div>
    )
}

export default Profile