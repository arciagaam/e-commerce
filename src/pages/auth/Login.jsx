import React from 'react';
import {auth} from './../../firebase';

const Login = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center">

                <div className="flex flex-col rounded-md shadow-md min-w-[30%] py-5 px-3">

                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' className='border rounded-md p-1'/>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' className='border rounded-md p-1'/>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Login