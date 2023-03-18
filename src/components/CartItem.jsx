import React from 'react'
import { useState, useEffect } from 'react';

const CartItem = ({ cartItem, setDeletedItem, setTotal }) => {

    const [totalPrice, setTotalPrice] = useState(0);
    const handleRemove = (cartId) => {

        setDeletedItem(cartId);
    }

    const totalPerItem = cartItem.quantity * cartItem.pricing;

    useEffect(() => {
        setTotalPrice(totalPerItem);
        setTotal(totalPrice);
    }, [totalPrice]);

    return (

        <div className="flex flex-row py-5 px-4 gap-5 justify-between">

            <div className="flex flex-row flex-1 gap-10">
                <div className="flex flex-col">
                    <div className="aspect-square h-[160px] overflow-hidden">
                        <img className='object-cover' src={cartItem.images[0].url} alt="prod" />
                    </div>
                </div>

                <div className="flex flex-col justify-between">

                    <div className="flex flex-row gap-10">
                        <div className="flex flex-col">
                            <div className="flex flex-row gap-10">
                                <p>{cartItem.name}</p>
                                <p>Php {cartItem.pricing}</p>
                            </div>
                                {cartItem.addOns && 
                                    cartItem.addOns.map(addOn => {
                                        return <div className="flex flex-row gap-5">
                                            <p>{addOn.name}</p>
                                            <p>{addOn.quantity}</p>
                                            <p>{addOn.price}</p>
                                        </div>

                                    })}

                        </div>
                    </div>

                </div>
            </div>

            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-row gap-20">
                    <p>Quantity: {cartItem.quantity}</p>
                    <p>Total: {totalPerItem}</p>
                </div>

                <div className="flex flex-row gap-2">
                    <p>Edit</p>
                    <button onClick={(value) => handleRemove(value = cartItem.cartId)}>Remove</button>
                </div>
            </div>
        </div>

    )
}

export default CartItem