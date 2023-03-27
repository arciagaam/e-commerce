import React, { useState, useEffect } from 'react'
import { auth, db } from '../../firebase';
import { useFetcher, useNavigate, useParams } from 'react-router-dom';
import {
    collection,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    getDoc,
    doc,
    deleteDoc,
    where,
    query
} from "firebase/firestore";
import CartItem from '../../components/CartItem';

const ShowProfileOrder = () => {

    const navigate = useNavigate();
    const params = useParams();

    const [orderDetails, setOrderDetails] = useState([]);
    const [customerDetails, setCustomerDetails] = useState([]);
    const [address, setAddress] = useState({});
    const [isDisplay, setIsDisplay] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderStatus, setOrderStatus] = useState('');

    const callbackTotal = (totalPrice) => {
        setTotalPrice((prevTotal) => prevTotal + totalPrice);
    }

    const handleStatusChange = async (e) => {
        const orderRef = doc(db, 'orders', params.id);
        await updateDoc(orderRef, { status: e.target.value })
            .then(() => { console.log('Updated order status!') })
            .catch(() => { console.log('Error!') });
    }

    useEffect(() => {
        const getDetails = async () => {
            const docRef = doc(db, 'orders', params.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setOrderDetails({ ...docSnap.data(), id: docSnap.id });
                setOrderStatus(docSnap.data().status);
            } else {
                console.log('Order not found');
            }

            const customerRef = doc(db, 'users', docSnap.data().user_id);
            const customerSnap = await getDoc(customerRef);

            if (customerSnap.exists()) {
                setAddress(customerSnap.data().addresses[customerSnap.data().default_shipping]);
                setCustomerDetails({ ...customerSnap.data(), id: customerSnap.id });

            } else {
                console.log('Customer not found');
            }
        }

        getDetails();
    }, [])

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between items-center bg-white p-5 rounded-md shadow-sm">
                <div className="flex flex-row gap-4">
                    <button onClick={() => { navigate('../') }} className="self-center border border-accent-dark h-[30px] w-[30px] rounded-lg hover:bg-accent-default hover:text-white hover:font-bold hover:border-accent-default transition-all duration-100">{'<'}</button>
                </div>
                <p className='bg-accent-default text-white py-2 px-3 rounded-md self-start'>Order ID: {params.id}</p>
            </div>

            <div className="flex flex-row gap-10 pb-20">
                <div className="flex flex-col gap-10 flex-[2] bg-zinc-200 p-5 rounded-md">
                    <div className="flex flex-col gap-3">
                        <p className='text-lg text-accent-default'>Product Details</p>
                        <div className="bg-white rounded-md">
                            {orderDetails.products &&
                                orderDetails.products.map(product => {
                                    return <CartItem
                                        key={product.cartId}
                                        setTotal={callbackTotal}
                                        isDisplay={isDisplay}
                                        cartItem={product} />
                                })}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className='text-lg text-accent-default'>Order Details</p>
                        <div className="flex flex-row justify-between bg-white p-5 rounded-md">
                            <div className="flex flex-col">
                                <p>Payment Method</p>
                                <p>{orderDetails.payment_method}</p>
                            </div>
                            <div className="flex flex-col">
                                <p>Order Date</p>
                                <p>{orderDetails.order_date?.toDate().toLocaleDateString()}</p>
                            </div>
                            <div className="flex flex-col">
                                <p>Amount Paid</p>
                                <p>{orderDetails.total_paid}</p>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="flex flex-col gap-10 flex-1">
                    <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                        <p className='text-xl font-bold'>Customer's Contact Information</p>
                        <div className="">
                            <p className='text-lg font-semibold'>Name</p>
                            <p className=''>{customerDetails.full_name}</p>
                        </div>
                        <div className="">
                            <p className='text-lg font-semibold'>Contact Number</p>
                            <p className=''>{customerDetails.mobile}</p>
                        </div>

                        <div className="">
                            <p className='text-lg font-semibold'>E-mail</p>
                            <p className=''>{customerDetails.email}</p>
                        </div>

                        <div className="">
                            <p className='text-lg font-semibold'>Address</p>
                            <p className=''>{address.address}</p>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default ShowProfileOrder