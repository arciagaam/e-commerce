import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { 
    collection,
    getDocs,
    getDoc,
    arrayUnion,
    updateDoc,
    doc,
} from "firebase/firestore";

const ManageAccount = () => {

    const { uid }  = JSON.parse(localStorage.getItem('user'));

    const [isInput, setIsInput] = useState(false);
    const [show, setShow] = useState(false);

    const [addresses, setAddresses] = useState([]);
    const [name, setName] = useState();
    const [address, setAddress] = useState([]);
    const [postal, setPostal] = useState([]);
    const [number, setNumber] = useState([]);

    // store data in an array
    const submit = async () => {
        try {
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
        } catch (err) {
            console.error('Address not saved',err);
        }
        setIsInput(false);
        setShow(false);
    }

    // useEffect(() => {
    //     const fetch = async () => {
    //         const docRef = doc(db, 'users', uid);
    //         const docSnap = await getDoc(docRef);
    //         if (docSnap.exists()) {
    //             setAddresses(docSnap.data().map(address))
    //             console.log(setAddresses);
    //         }
    //     }
    //     fetch()
    // }, []);

    const docRef = doc(db, 'users', uid);
    const docSnap = getDoc(docRef);
    docSnap.forEach()



    return (
        <div className="flex flex-col gap-5 bg-zinc-200 p-5 shadow-sm">
            <table className='table-auto text-left p-36'>
                <thead>
                    <tr className='bg-white'>
                        <th className='font-normal px-5'>Full Name</th>
                        <th className='font-normal px-5'>Address</th>
                        <th className='font-normal px-5'>Postcode</th>
                        <th className='font-normal px-5'>Phone Number</th>
                        <th className='font-normal px-5'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-sm border-b-cyan-600'>
                        <td className='p-5'>Name mong napakahaba</td>
                        <td className='p-5'>{address}</td>
                        <td className='p-5'>Manila - Sampaloc - Brgy. 1234</td>
                        <td className='p-5'>+(63) 912 345 6789</td>
                        <td className='p-5'><button className='text-cyan-600'>Edit</button></td>
                    </tr>
                </tbody>
            </table>
            <div className='flex flex-col justify-end gap-3'>
                <div className="flex gap-3">
                    <input type="text" className='w-1/2' onChange={(e) => {setName(e.target.value)}}  placeholder='Name' hidden={!show}/>
                    <input type="text"  className='w-1/2' onChange={(e) => {setAddress(e.target.value)}} placeholder='Address' hidden={!show}/>
                </div>
                <div className="flex flex-start">
                    <div className="flex mr-auto gap-3">
                        <input type="text" className='w-1/2' onChange={(e) => {setPostal(e.target.value)}} placeholder='Postal Code' hidden={!show}/>
                        <input type="text" className='w-1/2' onChange={(e) => {setNumber(e.target.value)}} placeholder='Phone Number' hidden={!show}/>
                    </div>
                    <div className="flex gap-3">
                        <button className='w-20 bg-accent-default' hidden={!show}>Cancel</button>
                        <button className='w-20 bg-accent-default' onClick={submit} hidden={!show}>Save</button>
                    </div>
                </div>
                
                <button className='w-56 p-3 text-lg bg-accent-default' onClick={() => setShow(true)}>+ ADD NEW ADDRESS</button>
            </div>
        </div>
    )
}

export default ManageAccount