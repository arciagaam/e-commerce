import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import ManageAccount from '../../components/profile/ManageAccount'

const Profile = () => {

    // const [display, setDisplay] = useState('ManageAccount')

    // useEffect(() => {

    // }, [display])

    return (
        <div className="flex flex-row columns-2 h-auto px-52">
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