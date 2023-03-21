import React from 'react'
import NumberCounter from './NumberCounter';
import { useState, useEffect, useRef } from 'react';
import { db, storage, auth } from '../firebase';
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    doc
} from 'firebase/firestore';

const EditCart = ({ cartItem, setIsActive }) => {

    const cartDetails = useRef({});

    useEffect(() => {
        cartDetails.current.product_id = cartItem.productId;
        cartDetails.current.quantity = cartItem.quantity;
        cartDetails.current.add_ons = cartItem.addOns;

    },[])

    const callbackCount = ({ type, name, count }) => {
        if (!cartDetails.current.add_ons) return false;

        if (type == 'addOns') {
            cartDetails?.current.add_ons.forEach(addOn => {
                if (name == addOn.name) {
                    addOn.quantity = count;
                }
            })
        } else if (type == 'product') {
            cartDetails.current.quantity = count;
        }

    }

    const handleEditCart = async () => {

        console.log(cartDetails);
        if (localStorage.getItem('user')) {
            const cartRef = doc(db, `users/${auth.currentUser.uid}/cart`, cartItem.cartId);

            await updateDoc(cartRef, cartDetails.current)
                .then(() => { console.log('Edited Cart Item Successfully!') })
                .catch(() => { console.log('Error!') });

            location.reload();
        } else {
            navigate('/login')
        }

    }


    return (
        <div className='flex absolute inset-0 z-20 justify-center items-center bg-gray-900/25'>
            <div className="flex flex-col gap-12 p-8 h-3/4 bg-gray-300">
                <div className="flex justify-end">
                    <button className="flex px-5 pt-2" onClick={() => setIsActive(false)}>X</button>
                </div>

                {/* Product Details */}
                <div className="flex flex-row justify-evenly py-10 gap-20">

                    <div className="aspect-square h-[500px] overflow-hidden">
                        <img className='object-cover' src={cartItem.images[0].url}></img>
                    </div>

                    <div className="flex flex-col gap-4 w-[50%]">
                        <div className="flex flex-col">
                            <p className='text-4xl'>{cartItem.name}</p>
                            <p className='text-2xl'>₱{cartItem.pricing}</p>
                        </div>

                        <div className="flex flex-col pt-5">
                            <p>{cartItem.description}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className='text-l font-bold'>Inclusions:</p>
                            <p className='text-m'>Dried Flower Bouqet</p>
                            <p className='text-m'>Fairy Lights</p>
                            <p className='text-m'>14" Box</p>
                            <NumberCounter setCounter={callbackCount} type={'product'} initialValue={cartItem.quantity} />
                        </div>

                        <div className="flex flex-col">
                            <p className='font-bold'>Add-ons:</p>

                            <div className="grid grid-cols-2 gap-5 pr-5">
                                {cartItem.addOns &&
                                    cartItem.addOns.map((addon, index) => <NumberCounter key={index} label={addon.name} type={'addOns'} price={addon.price} setCounter={callbackCount} initialValue={cartItem.quantity} />)}

                            </div>
                        </div>
                        <div className="flex justify-center mt-10">
                            <button onClick={handleEditCart} className="bg-[#EFE3D9] px-6 py-3">Edit Cart</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default EditCart