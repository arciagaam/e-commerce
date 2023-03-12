import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, storage } from '../../firebase';
import {
  collection,
  getDocs,
  getDoc,
  doc
} from 'firebase/firestore';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const { uid } = JSON.parse(localStorage.getItem('user'));

      const getCartItems = async () => {
        const cartRef = collection(db, `users/${uid}/cart`);
        const cartDoc = await getDocs(cartRef);

        if (cartDoc) {
          let cart = [];
          cartDoc.forEach(snap => {
            cart.push({ ...snap.data(), id: snap.id });
          })

          const cartData = cart.map(async (cart) => {
            const productRef = doc(db, 'products', cart.product_id);
            const productDoc = await getDoc(productRef);

            if (productDoc.exists()) {
              return (productDoc.data())
            }
          });

          Promise.all(cartData).then(values => {
            setCartItems(values);
          })
        }
      }

      getCartItems();

    } else {
      navigate('/');
    }

  }, [])


  return (
    <div className="flex flex-col min-h-screen">

      <p className='self-center'>My Cart</p>

      <div className="flex flex-row">

        <div className="flex flex-col w-[60%] bg-slate-100">

          {cartItems &&
            cartItems.map(cartItem => {
              return <CartItem cartItem={cartItem} />
            })
          }

        </div>

        <div className="flex flex-col flex-1 bg-slate-50 gap-5">

          <div className="flex flex-row gap-2">
            <p>Estimated Total</p>
            <p>Php 1,232.00</p>
          </div>

          <button>Checkout</button>

        </div>

      </div>

    </div>
  )
}

const CartItem = ({cartItem}) => {
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
                <p>Php {cartItem.costPerItem}</p>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-row gap-20">
          <p>Quantity</p>
          <p>Total</p>
        </div>

        <div className="flex flex-row gap-2">
          <p>Edit</p>
          <p>Remove</p>
        </div>
      </div>
    </div>

  )
}

export default Cart