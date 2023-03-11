import React, { useEffect, useState } from 'react';
import NumberCounter from '../../components/NumberCounter';
import Rating from '../../components/Rating';
import { db, storage } from '../../firebase';
import {
    collection,
    getDocs,
    getDoc,
    doc
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const Product = () => {
    const params = useParams();
    const [product, setProduct] = useState({});

    const submit = (event) => {
        alert('pasok')
    }

    useEffect(() => {

        const getProduct = async () => {
            const docRef = doc(db, 'products', params.id);
            const snapData = await getDoc(docRef);
            setProduct(snapData.data());
        }

        getProduct();

    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full gap-16 bg-white">

            <div className="grid grid-rows-2 w-[90%]">

                {/* Product Details */}
                <div className="flex flex-row justify-evenly py-10">

                    <div className="aspect-square">
                        <img className='object-cover' src='/images/cat1.png'></img>
                    </div>

                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col">
                            <p className='text-4xl'>{product?.name}</p>
                            <p className='text-2xl'>₱{product?.costPerItem}</p>
                        </div>

                        <div className="flex flex-col pt-5">
                            <p>{product.description}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className='text-l font-bold'>Inclusions:</p>
                            <p className='text-m'>Dried Flower Bouqet</p>
                            <p className='text-m'>Fairy Lights</p>
                            <p className='text-m'>14" Box</p>
                            <NumberCounter />
                        </div>

                        <div className="flex flex-col">
                            <p className='font-bold'>Add-ons:</p>

                            <div className="grid grid-cols-2 gap-5">
                                <NumberCounter label={'Ferrero Rocher Heart'} />
                                <NumberCounter label={'Crochet Tulip'} />
                                <NumberCounter label={'Toblerone'} />
                                <NumberCounter label={'Crochet Lavender'} />
                                <NumberCounter label={'Hershey'} />
                                <NumberCounter label={'Crochet Sunflower'} />
                                <NumberCounter label={'Kitkat'} />
                                <NumberCounter label={'Crochet Daisy'} />
                            </div>
                        </div>
                        <div className="flex justify-center mt-10">
                            <button className="bg-[#EFE3D9] px-6 py-3" onClick={submit}>Add to cart</button>
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