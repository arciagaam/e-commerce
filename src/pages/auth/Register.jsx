import React, {useState} from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {auth, db} from './../../firebase';
import {
    collection,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(email=='' || password=='') {
            setErrorMessage('Email and Password should not be empty.');
            return false;
        }

        if(password != confirmPassword) {
            setErrorMessage('Passwords do not match.');
            setPassword('');
            setConfirmPassword('');
            return false;
        }

        setErrorMessage('');

        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredentials)=>{
            const {email, uid} = userCredentials.user;
            try{
                await setDoc(doc(db, 'users', uid), {
                    email:email,
                    role:0,
                })                
                sessionStorage.setItem('message', 'Account Created');
                navigate('/login');
            }catch (err) {
                console.log('Something went wrong: ', err);
            }


        })
        .catch((err) => {
            console.log(err.message);
        })
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center flex-1">

                <div className="flex flex-col rounded-md shadow-md min-w-[40%] py-5 px-3 gap-5 ">

                    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                        <p className='text-xl'>Register</p>

                        <div className="flex flex-col gap-3">
                            <p className='text-red-500 text-xs text-center'>{errorMessage}</p>

                            <div className="flex flex-col">
                                <label htmlFor="email">Email</label>
                                <input type="text" id='email' value={email} onChange={(e) => {setEmail(e.target.value)}} className='border rounded-md p-1'/>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="password">Password</label>
                                <input type="password" id='password' value={password} onChange={(e) => {setPassword(e.target.value)}} className='border rounded-md p-1'/>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="confirm-password">Confirm password</label>
                                <input type="password" id='confirm-password' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} className='border rounded-md p-1'/>
                            </div>
                        </div>

                        <button type='submit' className='bg-primary p-2 mt-4'>Submit</button>

                        <p onClick={()=>{navigate("/login")}} className='text-sm text-center underline cursor-pointer'>Already have an account? Login here.</p>

                    </form>
                </div>

            </div>
        </>
    )
}

export default Register