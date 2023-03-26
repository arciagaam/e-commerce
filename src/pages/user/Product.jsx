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
import { useNavigate, useParams } from 'react-router-dom';

const Product = () => {
    const params = useParams();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState()
    const [dataCollection, setDataCollection] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [itemCount, setItemCount] = useState(0);
    const cartDetails = useRef({});

    useEffect(() => {
        const getProduct = async () => {
            const docRef = doc(db, 'products', params.id);
            const snapData = await getDoc(docRef);

            if (snapData.data()) {
                const collectionsRef = doc(db, 'collections', snapData.data().collection);
                const collectionData = await getDoc(collectionsRef);
                const temp = [];
                setDataCollection(collectionData.data())
                

                collectionData.data().addons.forEach(addOn => {temp.push({...addOn, quantity: 0})})
                cartDetails.current['add_ons'] = temp;
                
                const reviewRef = collection(db, `products/${params.id}/reviews`);
                const reviewDoc = await getDocs(reviewRef);

                let tempProduct = {};
                let reviews = [];

                if (reviewDoc) {
                    reviewDoc.forEach((review) => {
                        reviews.push({ ...review.data(), id: review.id});
                    })
                }

                tempProduct = snapData.data();
                tempProduct['reviews'] = reviews;
                setProduct(tempProduct);
                setIsLoading(false);
            }
        }
        getProduct();
    }, []);

    useEffect(() => {
        console.log(product.reviews);
    },[product])

    
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
                        <div className="flex w-[75%]">Product Reviews</div>
                        {!product.reviews.length ? <div>No Reviews</div> : 
                            product.reviews.map(review => {
                                return <Rating
                                    key={review.id}
                                    name={review.user_name}
                                    rating={review.rating}
                                    comment={review.comment}
                                />
                            })}

                    </div>
                </div>


            </div>
    )
}

export default Product