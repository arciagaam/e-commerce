import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
  const [totalPrice, setTotalPrice] = useState(0);

  const callbackDelete = (deletedItem) => {
    setDeletedItem(deletedItem);
  }

  const callbackTotal = (totalPrice) => {
    setTotalPrice((prevTotal) => prevTotal + totalPrice);
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
              temp['productId'] = cart.product_id;
              temp['quantity'] = cart.quantity;
              temp['add_ons'] = cart.add_ons;
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

      <div className="flex flex-row gap-5 mr-5">

        <div className="flex flex-col w-[60%] bg-accent-light">

          {cartItems &&
            cartItems.map(cartItem => {
              return <CartItem 
              key={cartItem.cartId}
              setDeletedItem={callbackDelete}
              setTotal={callbackTotal}
              cartItem={cartItem} />
            })
          }

        </div>

        <div className="flex flex-col flex-1 gap-5 p-5 rounded-md shadow-md">

          <div className="flex flex-row gap-2 justify-between items-start flex-1">
            <p>Estimated Total</p>
            <p className='text-xl font-bold'>₱ {totalPrice}</p>
          </div>

          {totalPrice !== 0 && <Link className='py-2 px-2 bg-accent-default text-white rounded-md w-fit self-end justify-self-end' to={`/checkout`} state={{cart: cartItems}}>Checkout</Link> }

          

        </div>

      </div>

    </div>
  )
}

export default Cart