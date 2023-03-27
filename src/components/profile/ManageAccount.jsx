import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom'
import {
    collection,
    getDocs,
    getDoc,
    updateDoc,
    doc,
    query,
    where
} from "firebase/firestore";
import TableRow from '../TableRow';

const ManageAccount = () => {

    const navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [number, setNumber] = useState();
    const [birthday, setBirthday] = useState();
    const [gender, setGender] = useState();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const { uid } = JSON.parse(localStorage.getItem('user'));

            const fetch = async () => {
                const docRef = doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setName(docSnap.data().full_name);
                    setEmail(docSnap.data().email);
                    setNumber(docSnap.data().number);
                    setBirthday(docSnap.data().birthday);
                    setGender(docSnap.data().gender);
                } else {
                    console.log('User not found.');
                }

            }

            const getOrders = async () => {
                const ordersRef = collection(db, 'orders');
                const q = query(ordersRef, where('user_id', '==', uid));
                const ordersDoc = await getDocs(q);

                const data = [];

                ordersDoc.forEach((order) => {
                    data.push({...order.data(), id: order.id});
                })

                console.log(data);
                setOrders(data);
            }

            fetch();
            getOrders();
        } else {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        console.log(orders);
    }, [orders])

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row columns-2 gap-3 h-60">
                <div className="flex flex-col w-1/3 pl-3 pt-3 gap-3 bg-zinc-200 shadow-md">
                    <p className='text-lg'>Personal Profile</p>
                    <p className='text-sm'>Name: {name}</p>
                    <p className='text-sm'>Email: {email}</p>
                    <p className='text-sm'>Mobile Number: {number}</p>
                    <p className='text-sm'>Birthday: {birthday}</p>
                    <p className='text-sm'>Gender: {gender}</p>
                </div>
                <div className="flex flex-col w-2/3 gap-3 bg-zinc-200 shadow-md">
                    <p className='text-lg pl-3 pt-3'>Address Book</p>
                    <div className="flex flex-row columns-2">
                        <div className="flex flex-col w-1/2 pl-3 pr-4 gap-2">
                            <p className='text-sm'>DEFAULT SHIPPING ADDRESS</p>
                            <p className='text-sm font-semibold'>Name mong napakahaba</p>
                            <p className='text-xs'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <p className='text-xs'>+(63) 912 345 6789</p>

                        </div>
                        <div className="flex flex-col w-1/2 pl-3 pr-4 gap-2">
                            <p className='text-sm'>DEFAULT BILLING ADDRESS</p>
                            <p className='text-sm font-semibold'>Name mong napakahaba</p>
                            <p className='text-xs'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <p className='text-xs'>+(63) 912 345 6789</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col shadow-md border-2">
                <div className=''>
                    <p className='text-lg'>Recent Orders</p>
                </div>
                <table className='w-full rounded-md overflow-hidden'>
                    <thead>
                        <tr className='text-left bg-accent-default text-white'>
                            <th className='p-2'>Order ID</th>
                            <th>Placed on</th>
                            <th>Items</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody className='bg-zinc-200 p-4'>
                        {orders.map((order, index) => {
                            return <TableRow
                                key={index}
                                table={'profileOrders'}
                                id={order.id}
                                order={order}

                            />
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageAccount