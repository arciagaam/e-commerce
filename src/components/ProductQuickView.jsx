import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NumberCounter from "./NumberCounter"
import { db, auth } from "../firebase";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    setDoc,
    updateDoc,
    doc,
    deleteDoc,
    serverTimestamp
} from "firebase/firestore";

const ProductQuickView = ({productName, productPrice, isActive, setIsActive, index, productImages, product}) => {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);

    useEffect(() => {

        const getData = async () => {
            const docRef = doc(db, 'cart', auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                if(docSnap.data().cart){
                    setCart([...docSnap.data()?.cart]);
                }
            }else {
            }
        }
        getData();

    }, [])

    const handleAddToCart = async () => {
        if(localStorage.getItem('user')){
            const cartRef = collection(db, `users/${auth.currentUser.uid}/cart`);

            await addDoc(cartRef, {product_id:product.id})
            .then(() => {console.log('success')})
            .catch(() => {console.log('error')});

            location.reload();
        }else {
            navigate('/login')
        }

    }

    return (
        <div className='flex absolute inset-0 z-20 justify-center items-center bg-gray-900/25'>
            <div className="flex flex-col gap-24 w-1/2 h-3/4 bg-gray-300">
                <div className="flex justify-end">
                    <button className="flex px-5 pt-2" onClick={() => setIsActive(false)}>X</button>
                </div>
                <div className="flex flex-row columns-2 gap-9 px-20 justify-center items-center">
                    <div className="flex">
                        <img src={productImages[index]} alt="" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className=" flex flex-col titlePrice gap-4 font-semibold">
                            <p className="text-2xl">{productName}</p>
                            <p className="text-2xl">₱{productPrice}</p>
                        </div>

                        <div className="inclusions">
                            <p className="text-normal font-semibold">Inclusions:</p>
                            <ul>
                                <li>1 Crochet Tulip</li>
                                <li>Fairy lights</li>
                                <li>14" box</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2">
                            <NumberCounter />
                            <button onClick={handleAddToCart} className="text-sm p-2 bg-[#EFE3D9]">Add to Cart</button>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )

}

export default ProductQuickView