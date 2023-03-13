import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, storage } from '../../firebase';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';
import CartItem from '../../components/CartItem';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [deletedItem, setDeletedItem] = useState('');

  const callbackDelete = (deletedItem) => {
    setDeletedItem(deletedItem);
  }

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

            let temp = {};

            if (productDoc.exists()) {
              temp = productDoc.data();
              temp['cartId'] = cart.id;
              temp['quantity'] = cart.quantity;
              return (temp);
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

  }, [deletedItem])

  useEffect(() => {
    if (deletedItem) {
      const { uid } = JSON.parse(localStorage.getItem('user'));
      const docRef = doc(db, `users/${uid}/cart`, deletedItem);
      
      deleteDoc(docRef).then(() => {
        console.log("Cart Item has been deleted successfully!");
      })
    }
  },[deletedItem])


  return (
    <div className="flex flex-col min-h-screen">

      <p className='self-center'>My Cart</p>

      <div className="flex flex-row">

        <div className="flex flex-col w-[60%] bg-slate-100">

          {cartItems &&
            cartItems.map(cartItem => {
              console.log(cartItem);
              return <CartItem 
              key={cartItem.cartId}
              setDeletedItem={callbackDelete}
              cartItem={cartItem} />
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

export default Cart