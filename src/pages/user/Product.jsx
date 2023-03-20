import React, { useEffect, useState, useRef } from 'react';
import NumberCounter from '../../components/NumberCounter';
import Rating from '../../components/Rating';
import { db, storage, auth } from '../../firebase';
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    doc
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const Product = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [dataCollection, setDataCollection] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [itemCount, setItemCount] = useState(0);
    const cartDetails = useRef({});

    // const callbackAddOnDetails = (details) => {
    //     if (Object.keys(details).length) {
    //         setAddOnDetails(details);
    //     }
    // }

    // useEffect(() => {
    //     setAddOnsArray((prevArray) => prevArray.concat(addOnDetails));
    // }, [addOnDetails]);

    // useEffect(() => {
    //     setFinalAddOns(() => {
    //         let temp = addOnsArray.sort((a, b) => {
    //             if (a.name < b.name) {
    //               return -1;
    //             } else if (a.name > b.name) {
    //               return 1;
    //             } else {
    //               return 0;
    //             }
    //           });

    //         let prevName = '';
    //         let result = temp.filter((addOn, index, arr) => {
    //             if (addOn.name === prevName) {
    //                 arr.splice(index - 1, 1);
    //             } else {
    //                 prevName = addOn.name;
    //             }
    //             return addOn;
    //         });

    //         result = result.filter((addOn) => (Object.keys(addOn).length !== 0 && addOn.quantity !== 0));

    //         return result;
    //     })
    // }, [addOnsArray])

    useEffect(() => {

        const getProduct = async () => {
            const docRef = doc(db, 'products', params.id);
            const snapData = await getDoc(docRef);
            setProduct(snapData.data());

            if (snapData.data()) {
                const collectionsRef = doc(db, 'collections', snapData.data().collection);
                const collectionData = await getDoc(collectionsRef);
                const temp = [];
                setDataCollection(collectionData.data())
                setIsLoading(false);

                collectionData.data().addons.forEach(addOn => {temp.push({...addOn, quantity: 0})})
                cartDetails.current['add_ons'] = temp;
            }
        }
        getProduct();

    }, []);

    
    const callbackCount = ({type, name, count}) => {
        if (!cartDetails.current.add_ons) return false;

        if (type == 'addOns') {
            cartDetails?.current.add_ons.forEach(addOn => {
                if (name == addOn.name) {
                    addOn.quantity = count;
                }
            })
        } else if (type == 'product') {
            cartDetails.current.quantity = count;
            cartDetails.current.product_id = params.id;
        }
        
    }

    const handleAddToCart = async () => {

        console.log(cartDetails);
        if(localStorage.getItem('user')){
            const cartRef = collection(db, `users/${auth.currentUser.uid}/cart`);

            await addDoc(cartRef, cartDetails.current)
            .then(() => {console.log('success')})
            .catch(() => {console.log('error')});

            location.reload();
        }else {
            navigate('/login')
        }

    }

    return (

        isLoading ? <div>Loading</div> :

            <div className="flex flex-col items-center justify-center h-full gap-16 bg-white">

                <div className="grid grid-rows-2 w-[90%] ">

                    {/* Product Details */}
                    <div className="flex flex-row justify-evenly py-10 gap-20">

                        <div className="aspect-square h-[500px] overflow-hidden">
                            <img className='object-cover' src={product.images[0].url}></img>
                        </div>

                        <div className="flex flex-col gap-10 w-[50%]">
                            <div className="flex flex-col">
                                <p className='text-4xl'>{product.name}</p>
                                <p className='text-2xl'>₱{product.costPerItem}</p>
                            </div>

                            <div className="flex flex-col pt-5">
                                <p>{product.description}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className='text-l font-bold'>Inclusions:</p>
                                <p className='text-m'>Dried Flower Bouqet</p>
                                <p className='text-m'>Fairy Lights</p>
                                <p className='text-m'>14" Box</p>
                                <NumberCounter setCounter={callbackCount} type={'product'} />
                            </div>

                            <div className="flex flex-col">
                                <p className='font-bold'>Add-ons:</p>

                                <div className="grid grid-cols-2 gap-5">
                                    {dataCollection &&
                                        dataCollection.addons.map((addon, index) => <NumberCounter key={index} label={addon.name} type={'addOns'} price={addon.price} setCounter={callbackCount} />)}

                                </div>
                            </div>
                            <div className="flex justify-center mt-10">
                                <button className="bg-[#EFE3D9] px-6 py-3" onClick={handleAddToCart}>Add to cart</button>
                            </div>
                        </div>
                    </div>

                    {/* Comment Section */}
                    <div className="flex flex-col w-full  bg-slate-100 p-8 gap-2">
                        <div className="flex w-[75%]">Customer Reviews</div>
                        <Rating />
                        <Rating />

                    </div>
                </div>


            </div>
    )
}

export default Product