import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom'
import {
    collection,
    getDocs,
    getDoc,
    arrayUnion,
    updateDoc,
    doc,
} from "firebase/firestore";
import AddressRow from './AddressRow';

const ManageAccount = () => {

    const navigate = useNavigate();

    const [isInput, setIsInput] = useState(false);
    const [show, setShow] = useState(false);

    const [addresses, setAddresses] = useState([]);
    const [userData, setUserData] = useState();
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [postal, setPostal] = useState();
    const [number, setNumber] = useState();



    // store data in an array of object
    const submit = async () => {
        try {
            if (localStorage.getItem('user')) {
                const { uid } = JSON.parse(localStorage.getItem('user'));
                const docRef = doc(db, 'users', uid);
                await updateDoc(docRef, {
                    addresses: arrayUnion({
                        name: name,
                        address: address,
                        code: postal,
                        mobile: number,
                    })
                });
                console.log('Address saved');
            } else {
                // navigate('/');
            }
        } catch (err) {
            console.error('Address not saved', err);
        }
        setIsInput(false);
        setShow(false);

    }

    // Get data in an array of object
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const { uid } = JSON.parse(user);
            const getAddress = async () => {
                const docRef = doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);

                setUserData({ ...docSnap.data(), id: docSnap.id });
                setAddresses(docSnap.data().addresses);
            }
            getAddress();
        } else {
            // navigate('/');
        }
    }, []);

    const callbackAddress = async ({ data, index }) => {
        const user = localStorage.getItem('user');

        if (user) {
            const { uid } = JSON.parse(user);
            addresses[index] = data;
            const docRef = doc(db, 'users', uid);
            await updateDoc(docRef, {
                addresses: addresses
            })
        }
    }

    return (
        <>
            <p className='text-2xl'>Manage My Account</p>

            <div className="flex flex-col gap-5 bg-zinc-200 p-5 shadow-sm overflow-x-auto">
                <div className="flex flex-col gap-5">

                    {addresses && addresses.map((address, index) => (
                        <AddressRow key={index} address={address} index={index} callbackAddress={callbackAddress} userData={userData} />
                    ))}

                </div>

                <div className='flex flex-col justify-end gap-3'>
                    <div className="flex gap-3">
                        <input type="text" className='w-1/2' onChange={(e) => { setName(e.target.value) }} placeholder='Name' hidden={!show} />
                        <input type="text" className='w-1/2' onChange={(e) => { setAddress(e.target.value) }} placeholder='Address' hidden={!show} />
                    </div>
                    <div className="flex flex-start">
                        <div className="flex mr-auto gap-3">
                            <input type="text" className='w-1/2' onChange={(e) => { setPostal(e.target.value) }} placeholder='Postal Code' hidden={!show} />
                            <input type="text" className='w-1/2' onChange={(e) => { setNumber(e.target.value) }} placeholder='Phone Number' hidden={!show} />
                        </div>
                        <div className="flex gap-3">
                            <button className='w-20 bg-accent-default' onClick={() => setShow(false)} hidden={!show}>Cancel</button>
                            <button className='w-20 bg-accent-default' onClick={submit} hidden={!show}>Save</button>
                        </div>
                    </div>

                    <button className='w-56 p-3 text-lg bg-accent-default' onClick={() => setShow(true)}>+ ADD NEW ADDRESS</button>
                </div>
            </div>
        </>
    )
}

export default ManageAccount