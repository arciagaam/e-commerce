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
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const Checkout = () => {

    let { state } = useLocation();
    const navigate = useNavigate();

    const [userAddress, setUserAddress] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [isDisplay, setIsDisplay] = useState(false);
    const [checkOutItems, setCheckOutItems] = useState([]);
    const [totalCheckout, setTotalCheckout] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');

    const callbackTotal = (totalPrice) => {
        setTotalPrice((prevTotal) => prevTotal + totalPrice);
    }

    const handlePlaceOrder = async () => {
        if (localStorage.getItem('user')) {
            const { uid } = JSON.parse(localStorage.getItem('user'));
            const date = new Date().toLocaleDateString();

            const cartIds = checkOutItems.map(item => item.cartId);
            const orderRef = collection(db, 'orders');
            const orderDoc = {
                user_id: uid,
                total_price: totalCheckout,
                total_paid: 0,
                payment_method: paymentMethod,
                status: 'placed',
                products: checkOutItems,
                order_date: date
            }
            // console.log(productIds)
            await addDoc(orderRef, orderDoc)
                .then(() => { console.log('Successfully Ordered!') })
                .catch(() => { console.log('Error!') })

            for (const id of cartIds) {
                const cartDocRef = doc(db, `users/${auth.currentUser.uid}/cart`, id);
                await deleteDoc(cartDocRef);
            }

            navigate('/account');
        }
    }

    const selectPaymentMethod = (method) => {
        setPaymentMethod(method);
    }

    const displayCheckoutButton = () => {
        if (paymentMethod == 'Cash On Delivery') {
            console.log('hello');
            return (<button onClick={handlePlaceOrder} className="p-3 bg-accent-default">PLACE ORDER</button>)
        } else if (paymentMethod == 'PayPal') {
            return (<button>Hello</button>)
        }
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
        displayCheckoutButton();
    }, [paymentMethod])

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
                                isDisplay={isDisplay}
                                cartItem={cartItem} />
                        })
                    }
                </div>

            </div>
            <div className="flex w-2/6 flex-col p-3 gap-5 bg-zinc-200">
                <div className="flex flex-col gap-2">
                    <p className='text-lg'>Select Payment Method</p>
                    <button onClick={() => selectPaymentMethod('Cash On Delivery')} className="flex flex-row gap-3 p-5 items-center">
                        <box-icon size='lg' name='money'></box-icon>
                        <p>Cash On Delivery</p>
                    </button>
                    <button onClick={() => selectPaymentMethod('PayPal')} className="flex flex-row gap-3 p-5 items-center">
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

                {paymentMethod == 'Cash On Delivery' ?
                    <button onClick={handlePlaceOrder} className="p-3 bg-accent-default">PLACE ORDER</button>
                    :
                    <PayPalScriptProvider
                        options={{ "client-id": "AU-7_We1OS5QiDFAMoDHBwfECjIB_xUAu0FKHtQ1a16jRyOuUBsSlQHg_bHlcXTsw-rYKI87ztNS3hhH" }}>
                        <PayPalButtons createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: `${totalCheckout}`,
                                        },
                                    },
                                ],
                            });
                        }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then(() => {
                                    handlePlaceOrder
                                });
                            }}
                        />
                    </PayPalScriptProvider>}
            </div>
        </div>
    )
}

export default Checkout