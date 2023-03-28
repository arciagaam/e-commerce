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

const ProductQuickView = ({ productName, productPrice, isActive, setIsActive, index, productImages, product }) => {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [itemCount, setItemCount] = useState(0);
    const [stocks, setStocks] = useState(0);

    const callbackCount = ({type, count}) => {
        if (type == 'product') {
            setItemCount(count);            
        }
    }

    useEffect(() => {

        const getData = async () => {
            const docRef = doc(db, 'cart', auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                if (docSnap.data().cart) {
                    setCart([...docSnap.data()?.cart]);
                }
            } else {
            }
            

        }
        getData();

        setStocks(product.inventory);

    }, [])

    console.log(product)

    const handleAddToCart = async () => {
        if (localStorage.getItem('user')) {
            const cartRef = collection(db, `users/${auth.currentUser.uid}/cart`);

            const collectionsRef = doc(db, 'collections', product.collection);
            const collectionData = await getDoc(collectionsRef);
            const temp = [];

            collectionData.data().addons.forEach(addOn => { temp.push({ ...addOn, quantity: 0 }) })
            

            await addDoc(cartRef, { product_id: product.id, quantity: itemCount, add_ons: temp })
                .then(() => { console.log('success') })
                .catch(() => { console.log('error') });

            location.reload();
        } else {
            navigate('/login')
        }

    }

    return (
        <div className='absolute flex min-h-full inset-0 z-20 justify-center items-center bg-gray-900/25 '>
            <div className="flex flex-col bg-white gap-5 py-5 rounded-md shadow-lg">
                <div className="flex justify-end">
                    <button className="flex px-5" onClick={() => setIsActive(false)}>X</button>
                </div>
                <div className="flex flex-row px-20 gap-20 justify-center items-center">
                    <div className="flex w-[300px] aspect-square">
                        <img className="object-cover h-full w-full" src={product.images[0].url} alt="" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className=" flex flex-col titlePrice gap-4 font-semibold">
                            <p className="text-2xl">{productName}</p>
                            <p className="text-2xl">₱{productPrice}</p>
                            {stocks == 0 ? 
                                <p className="italic text-xs font-thin text-red-600">No stocks available.</p> :
                                <p className="italic text-xs font-thin">Stocks available: {stocks}</p>
                            }

                        </div>

                        <div className="inclusions">
                            <p className="text-normal font-semibold">Inclusions:</p>
                            <ul>
                                {product.inclusions && product.inclusions.map((inclusion, index) => (
                                    <li key={index}>{inclusion}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2">
                            <NumberCounter
                                setCounter={callbackCount}
                                type={'product'}
                            />
                            <button onClick={handleAddToCart} disabled={stocks == 0 ? true : false} className={`text-sm p-2 bg-[#EFE3D9] ${stocks == 0 ? `grayscale` : ``}`}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default ProductQuickView