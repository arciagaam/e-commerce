import React, { useEffect, useState, useRef } from 'react';
import NumberCounter from '../../components/NumberCounter';
import Rating from '../../components/Rating';
import { db, storage, auth } from '../../firebase';
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    doc,
    query,
    where
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
    const [hasOrdered, setHasOrdered] = useState(false);
    const [stocks, setStocks] = useState(0);

    useEffect(() => {
        const getProduct = async () => {
            const docRef = doc(db, 'products', params.id);
            const snapData = await getDoc(docRef);

            if (snapData.data()) {
                const collectionsRef = doc(db, 'collections', snapData.data().collection);
                const collectionData = await getDoc(collectionsRef);
                const temp = [];
                setDataCollection(collectionData.data())


                collectionData.data().addons.forEach(addOn => { temp.push({ ...addOn, quantity: 0 }) })
                cartDetails.current['add_ons'] = temp;

                const reviewRef = collection(db, `products/${params.id}/reviews`);
                const reviewDoc = await getDocs(reviewRef);

                let tempProduct = {};
                let reviews = [];

                if (reviewDoc) {
                    reviewDoc.forEach((review) => {
                        reviews.push({ ...review.data(), id: review.id });
                    })
                }

                tempProduct = snapData.data();
                tempProduct['reviews'] = reviews;
                setProduct(tempProduct);
                setStocks(tempProduct.inventory);
                setIsLoading(false);
            }

            if (localStorage.getItem('user')) {
                const { uid } = JSON.parse(localStorage.getItem('user'));
                const ordersRef = collection(db, 'orders');
                const q = query(ordersRef, where('user_id', '==', uid))
                const ordersDoc = await getDocs(q);

                ordersDoc.forEach((order) => {
                    order.data().products.forEach((product) => {
                        if (product.productId == params.id) {
                            setHasOrdered(true);
                        }
                    })
                })
            }



        }
        getProduct();
    }, []);

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
            cartDetails.current.product_id = params.id;
        }

    }

    const handleAddToCart = async () => {

        if (localStorage.getItem('user')) {
            const cartRef = collection(db, `users/${auth.currentUser.uid}/cart`);

            await addDoc(cartRef, cartDetails.current)
                .then(() => { console.log('success') })
                .catch(() => { console.log('error') });

            location.reload();
        } else {
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
                                {stocks == 0 ? 
                                    <p className="italic text-xs font-thin text-red-600">No stocks available.</p> :
                                    <p className="italic text-xs font-thin">Stocks available: {stocks}</p>
                                }
                            </div>

                            <div className="flex flex-col pt-5">
                                <p>{product.description}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className='text-l font-bold'>Inclusions:</p>
                                {product.inclusions &&
                                    product.inclusions.map((inclusion, index) => {
                                        return (<p key={index} className='text-m'>{inclusion}</p>)
                                    })}

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
                                <button className={`px-6 py-3 bg-[#EFE3D9] ${stocks == 0 ? `grayscale` : ``}`} onClick={handleAddToCart} disabled={stocks == 0 ? true : false} >Add to cart</button>
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

                        {hasOrdered &&
                            <Rating
                                // key={review.id}
                                hasOrdered={hasOrdered}
                                productId={params.id}
                            // name={review.user_name}
                            // rating={review.rating}
                            // comment={review.comment}
                            />}
                    </div>
                </div>


            </div>
    )
}

export default Product