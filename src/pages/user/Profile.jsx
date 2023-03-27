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
        <div className="flex flex-row flex-1 columns-2 px-52 w-full">
            <div className="flex w-1/5 flex-col">
                <NavLink to='/account'>
                    Manage My Account
                </NavLink>
                <NavLink to='myprofile'>
                    My Profile
                </NavLink>
                <NavLink to='addressbook'>
                    Address Book
                </NavLink>
                <button onClick={handleSignOut} className='text-left'>Sign Out</button>
            </div>
            <div className="flex flex-col w-4/5 gap-5">                
                <Outlet/>
            </div>
        </div>
    )
}

export default Profile