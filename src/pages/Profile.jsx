import React from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


const Profile = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            sessionStorage.setItem('message', 'User logged out.');
            navigate('/');
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