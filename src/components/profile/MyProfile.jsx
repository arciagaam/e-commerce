import React from 'react'

const MyProfile = () => {
    return (
        <div className="flex flex-col gap-5 bg-zinc-200 p-5 shadow-sm">
            <div className="grid grid-cols-3 gap-8">
                <div className="flex flex-col gap-2">
                    <p className='text-sm'>Full Name</p>
                    <p className=''>Name mong napakahaba</p>
                </div>
                <div className="flex flex-col  gap-2">
                    <p className='text-sm'>Email Address</p>
                    <p className=''>juandelacruz@gmail.com</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p className='text-sm'>Mobile Number</p>
                    <p className=''>+(63) 912 *** **89</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p className='text-sm'>Birthday</p>
                    <p className=''>Enter your birthday</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p className='text-sm'>Gender</p>
                    <p className=''>Enter your gender</p>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <button className='text-lg p-3 w-56 bg-accent-default'>Edit Profile</button>
                <button className='text-lg p-3 w-56 bg-accent-default'>Set Password</button>
            </div>
        </div>
    )
}

export default MyProfile