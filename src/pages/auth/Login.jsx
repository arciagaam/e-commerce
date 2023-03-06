import React, {useEffect, useState} from 'react';
import {auth, db} from './../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    setDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";

const Login = () => {

    useEffect(()=>{
        if(localStorage.getItem('user')){
            const {role} = JSON.parse(localStorage.getItem('user'));
            if(role == 0){
                navigate('/');
            }else {
                navigate('/admin');
            }
        }
    },[])

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(email=='' || password=='') {
            setErrorMessage('Email and Password should not be empty.');
            return false;
        }

        setErrorMessage('');

        signInWithEmailAndPassword(auth, email, password)
        .then( async (userCredentials) => {
            //signed in
            const {email, uid} = userCredentials.user;
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                const {role} = docSnap.data();
                localStorage.setItem('user', JSON.stringify({email, uid, role}));
                location.reload();
            }else {
                console.error('No data exists.');
            }
        })
        .catch((err) => {
            if(err.message.includes('wrong-password') || err.message.includes('invalid-email')){
                setErrorMessage('Invalid email or password.');
            } else if(err.message.includes('user-not-found')) {
                setErrorMessage('Invalid email or password.');
            } else {
                console.error(err);
            }
            setPassword('');
        });
    }

    return (
        <>
            {localStorage.getItem('message') && <Toast message={localStorage.getItem('message')}/>}
            
            <div className="flex flex-col justify-center items-center flex-1">

                <div className="flex flex-col rounded-md shadow-md min-w-[40%] py-5 px-3 gap-5 ">

                    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                        <p className='text-xl'>Login</p>

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

                            <a href='#' className=' text-xs text-right'>Forgot password?</a>
                        </div>

                        <button type='submit' className='bg-primary p-2 mt-4'>Submit</button>

                        <p onClick={()=>{location.href='/register'}} className='text-sm text-center underline cursor-pointer'>Don't have an account? Register here.</p>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Login