import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { 
    collection,
    getDocs,
    getDoc,
    updateDoc,
    doc,
} from "firebase/firestore";



const MyProfile = () => {

    const { uid }  = JSON.parse(localStorage.getItem('user'));

    const [isInput, setIsInput] = useState(false);
    const [show, setShow] = useState(false);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [number, setNumber] = useState();
    const [birthday, setBirthday] = useState();
    const [gender, setGender] = useState();

    
    
    // Get data of logged in user
    useEffect(() => {
        const fetch = async () => {
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setName(docSnap.data().name);
                setEmail(docSnap.data().email);
                setNumber(docSnap.data().number);
                setBirthday(docSnap.data().birthday);
                setGender(docSnap.data().gender);
            } else {
                console.log ('User not found.');
            }
        }
        fetch();
    }, []);

    // Store data to firestore
    const submit = async () => {
        try {
            const docRef = doc(db, 'users', uid);
            await updateDoc(docRef, {
                name: name,
                email: email,
                mobile: number,
                birthday: birthday,
                gender: gender,
            });
            console.log('Product saved');
        } catch (err) {
            console.error('Product not saved', err);
        } 
        setIsInput(false);
        setShow(false);
    }

    // Accepts number only and limits to 11 digits
    const numberHandler = val => {
        const validate = val.replace(/^(\d{0,11}).*$/, '$1');
        setNumber(validate);
    }

    const edit = () => {
        setIsInput(true);
        setShow(true);
    }


    return (
        <div className="flex flex-col gap-5 bg-zinc-200 p-5 shadow-sm">
            <div className="grid grid-cols-3 gap-8">
                <div className="flex flex-col gap-2">
                    <p className='text-sm'>Full Name</p>
                    <input type="text" disabled={!isInput} onChange={(e) => {setName(e.target.value)}} value={name}/>
                </div>
                <div className="flex flex-col  gap-2">
                    <p className='text-sm'>Email Address</p>
                    <input type="text" maxLength={11} disabled={!isInput} onChange={(e) => { setEmail(e.target.value)}} value={email}/>
                </div>
                <div className="flex flex-col gap-2">
                    <p className='text-sm'>Mobile Number</p>
                    <input type="tel" onChange={(e) => { numberHandler(e.target.value)}} disabled={!isInput} value={number}/>
                </div>
                <div className="flex flex-col gap-2">
                    <p className='text-sm'>Birthday</p>
                    <input type="date" disabled={!isInput} onChange={(e) => { setBirthday(e.target.value)}}  value={birthday}/>

                </div>
                <div className="flex flex-col gap-2">
                    <p className='text-sm'>Gender</p>
                    <select name="Gender" id="gender" disabled={!isInput} onChange={(e) => { setGender(e.target.value)}} value={gender}>
                        <option value=""></option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>

                </div>
                
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-end gap-3">
                    <button className='text-lg p-3 w-56 bg-accent-default mr-auto' onClick={() => edit()}>Edit Profile</button>
                    <button className='text-base p-3 w-20 bg-accent-default' hidden={!show} onClick={submit} type='submit'>Save</button>
                    {/* <button className='text-base p-3 w-20 bg-accent-default' hidden={show} onClick={edit} type='submit'>Cancel</button> */}
                </div>
                <button className='text-lg p-3 w-56 bg-accent-default'>Set Password</button>
            </div>
        </div>
    )
}

export default MyProfile