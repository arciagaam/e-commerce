import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';

const Tracking = () => {
    const params = useParams();
    const [orderID, setOrderID] = useState('');
    const [orderData, setOrderData] = useState('');
    const [proceed, setProceed] = useState(false)
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState(0)
    const [textStatus, setTextStatus] = useState('');
    useEffect(() => {
        const getOrderData = async () => {
            const docRef = doc(db, 'orders', params.id)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setMessage('');
                setOrderData({ ...docSnap.data(), id: docSnap.id });
                switch (docSnap.data().status) {
                    case 'placed': setStatus(0); setTextStatus('Your order is placed.'); break;
                    case 'packed': setStatus(1); setTextStatus('Your order is packed and is ready to be delivered.'); break;
                    case 'shipped': setStatus(2); setTextStatus('Your order is on its way!'); break;
                    case 'delivered': setStatus(3); setTextStatus('Package has been delivered.'); break;
                }

                setProceed(true);
            } else {
                setMessage('Order not found.');
            }
        }

        params.id && getOrderData();

    }, []);
    


    return (

        <div className='flex flex-col flex-1 items-center justify-center'>

            {
                proceed &&
                <div className="flex flex-col gap-14 mb-40">
                    <div className="flex flex-row items-center ">
                        <div className="relative flex flex-col items-center">
                            <div className={`flex flex-col items-center justify-center border-4 p-2 border-accent-default bg-accent-default rounded-full`}>
                                <box-icon name='file' type='solid' size='40px' color="#fff"></box-icon>
                            </div>
                            <p className='absolute bottom-[-50%] font-bold text-accent-default'>Placed</p>
                        </div>
                        <div className={`min-h-[5px] w-[50px] bg-accent-dark ${status >= 1 && 'bg-accent-default'}`}></div>
                        <div className="relative flex flex-col items-center">
                            <div className={`flex flex-col items-center justify-center border-4 p-2 border-accent-dark rounded-full ${status >= 1 && 'bg-accent-default border-accent-default'}`}>
                                <box-icon name='package' type='solid' size='40px' color={status >= 1 ? '#fff' : '#3B0C15'}></box-icon>
                            </div>
                            <p className={`absolute bottom-[-50%] ${status >= 1 && 'text-accent-default font-bold'}`}>Packed</p>
                        </div>
                        <div className={`min-h-[5px] w-[50px] bg-accent-dark ${status >= 2 && 'bg-accent-default'}`}></div>
                        <div className="relative flex flex-col items-center">
                            <div className={`flex flex-col items-center justify-center border-4 p-2 border-accent-dark rounded-full ${status >= 2 && 'bg-accent-default border-accent-default'}`}>
                                <box-icon name='truck' type='solid' size='40px' color={status >= 2 ? '#fff' : '#3B0C15'}></box-icon>
                            </div>
                            <p className={`absolute bottom-[-50%] ${status >= 2 && 'text-accent-default font-bold'}`}>Shipped</p>
                        </div>
                        <div className={`min-h-[5px] w-[50px] bg-accent-dark ${status >= 3 && 'bg-accent-default'}`}></div>
                        <div className="relative flex flex-col items-center">
                            <div className={`flex flex-col items-center justify-center border-4 p-2 border-accent-dark rounded-full ${status >= 3 && 'bg-accent-default border-accent-default'}`}>
                                <box-icon name='check' size='40px' color={status >= 3 ? '#fff' : '#3B0C15'}></box-icon>
                            </div>
                            <p className={`absolute bottom-[-50%] ${status >= 3 && 'text-accent-default font-bold'}`}>Delivered</p>
                        </div>
                    </div>
                    
                    <p className="flex self-center text-lg">{textStatus}</p>
                </div>
            }

            <div className="flex flex-col items-center w-full">
                <p className='text-xl'>Track your order</p>
                <form action={`/track/${orderID}`} method="GET" className='flex flex-col gap-2 w-full'>
                    <input onChange={(e) => { setOrderID(e.target.value) }} value={orderID} type="text" className='border rounded-md text-2xl py-2 w-[60%] self-center text-center' />
                    <button type='submit' className='py-2 px-5 bg-accent-default w-fit self-center rounded-md text-white'>Search</button>
                </form>

                <p>{message}</p>

            </div>
        </div>
    )
}

export default Tracking