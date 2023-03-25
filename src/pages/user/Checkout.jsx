import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { db, storage, auth } from '../../firebase';
import CartItem from '../../components/CartItem';
import {
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    deleteDoc
} from 'firebase/firestore';

const Checkout = () => {

    let { state } = useLocation();
    const navigate = useNavigate();

    const [userAddress, setUserAddress] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [isCheckout, setIsCheckout] = useState(false);
    const [checkOutItems, setCheckOutItems] = useState([]);
    const [totalCheckout, setTotalCheckout] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');

    const callbackTotal = (totalPrice) => {
        setTotalPrice((prevTotal) => prevTotal + totalPrice);
    }

    const handlePlaceOrder = async () => {
        if(localStorage.getItem('user')) {

            const cartIds = checkOutItems.map(item => item.cartId);
            const orderRef = collection(db, 'orders');
            const orderDoc = {
                total_price: totalCheckout,
                total_paid: 0,
                payment_method: paymentMethod,
                status: 'Pending',
                products: checkOutItems
            }
            // console.log(productIds)
            await addDoc(orderRef, orderDoc)
            .then(() => {console.log('Successfully Ordered!')})
            .catch(() => {console.log('Error!')})

            cartIds.forEach( async (cartId) => {
                const cartDocRef = doc(db, `users/${auth.currentUser.uid}/cart`, cartId);

                await deleteDoc(cartDocRef);
            })

            navigate('/account');
        }
    }

    const selectPaymentMethod = (method) => {
        setPaymentMethod(method);
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const { uid } = JSON.parse(localStorage.getItem('user'));

            const getAddress = async () => {
                const addressRef = doc(db, 'users', uid);
                const addressDoc = await getDoc(addressRef);

                setUserAddress(addressDoc.data().addresses[0]);
            }
            getAddress();
            setCheckOutItems(state.cart);

        } else {
            navigate('/login')
        }

    }, [])

    useEffect(() => {
        setTotalCheckout(totalPrice + 100);
    }, [totalPrice])

    useEffect(() => {
        console.log(paymentMethod);
    },[paymentMethod])

    return (
        <div className='flex flex-row columns-2 h-auto gap-4 px-52 w-full '>
            <div className="flex w-4/6 flex-col">
                <div className="flex flex-col">
                    <div className="flex justify-between px-4 py-2 bg-accent-default">
                        <p>Shipping Address</p>
                        <button>Edit</button>
                    </div>
                    <div className="flex flex-col gap-4 p-4 bg-zinc-200">
                        <div className="flex flex-row gap-5">
                            <p>{userAddress.name}</p>
                            <p>{userAddress.mobile}</p>
                        </div>
                        <div className="flex flex-row gap-5 items-center">
                            <div className="px-3 rounded-l-3xl rounded-r-3xl bg-accent-default">Default</div>
                            <p>{userAddress.address}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col bg-slate-100 gap-5">
                    {state.cart &&
                        state.cart.map(cartItem => {
                            return <CartItem
                                key={cartItem.cartId}
                                setTotal={callbackTotal}
                                isCheckout={isCheckout}
                                cartItem={cartItem} />
                        })
                    }
                </div>

            </div>
            <div className="flex w-2/6 flex-col p-3 gap-5 bg-zinc-200">
                <div className="flex flex-col gap-2">
                    <p className='text-lg'>Select Payment Method</p>
                    <button onClick={() => selectPaymentMethod('cod')} className="flex flex-row gap-3 p-5 items-center">
                        <box-icon size='lg' name='money'></box-icon>
                        <p>Cash On Delivery</p>
                    </button>
                    <button onClick={() => selectPaymentMethod('paypal')} className="flex flex-row gap-3 p-5 items-center">
                        <box-icon size='lg' name='paypal' type='logo' ></box-icon>
                        <p>Paypal</p>
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    <p className='text-lg'>Order Summary</p>
                    <div className="flex flex-row justify-between pr-3">
                        <p className='text-sm'>Subtotal ({state.cart.length} items)</p>
                        <p className='font-medium'>₱ {totalPrice}.00</p>
                    </div>
                    <div className="flex flex-row justify-between pr-3">
                        <p className='text-sm'>Shipping Fee (may vary)</p>
                        <p className='font-medium'>₱ 100.00</p>
                    </div>
                    <div className="flex flex-row justify-between pt-3 pr-3 border-t-[1px] border-black">
                        <p className='text-sm font-medium'>Total:</p>
                        <p className='font-medium  text-accent-default'>₱ {totalCheckout}</p>
                    </div>

                </div>

                <button onClick={handlePlaceOrder} className="p-3 bg-accent-default">PLACE ORDER</button>
            </div>
        </div>
    )
}

export default Checkout