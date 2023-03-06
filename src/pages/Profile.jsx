import React, { useEffect } from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


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
        <div className='flex flex-col w-full'>

            <button onClick={handleSignOut}>Sign Out</button>

        </div>
    )
}

export default Profile