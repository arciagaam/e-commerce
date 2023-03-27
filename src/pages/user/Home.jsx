import React, { useEffect, useState } from 'react'
import Toast from '../../components/Toast';
import { db, storage } from '../../firebase';
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    setDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {

        const getData = async () => {
            const docRef = collection(db, 'products');
            const docSnap = await getDocs(docRef);

            const temp = [];

            docSnap.forEach((snap) => {
                temp.push({ ...snap.data(), id: snap.id });
            })

            setPopularProducts(temp);
        }

        getData();

    }, [])


    return (
        <>
            {localStorage.getItem('message') && <Toast message={localStorage.getItem('message')} />}

            <div className='flex flex-col w-full'>

                <div className="flex flex-col w-full gap-10">
                    {/* Hero */}
                    <div className="relative flex h-[60vh] justify-center items-center overflow-hidden">
                        <div className="flex flex-col items-center z-[2] text-white gap-5">
                            <p className='text-4xl'>Dried Flower Bouquets</p>
                            <button onClick={()=>{navigate('Shop')}} className='text-lg py-3 px-6 bg-accent-default text-white rounded-md hover:text-accent-dark hover:bg-accent-light transition-all duration-200'>Shop Now</button>
                        </div>

                        <div className="absolute inset-0 bg-hero bg-no-repeat bg-cover bg-center bg-accent-dark z-[1]"></div>
                    </div>

                    {/* Body */}

                    <p className='self-center text-2xl bg-accent-light w-full text-center py-5 font-bold text-accent-default'>Categories</p>
                    <div className="flex flex-col px-10 gap-20">

                        {/* Categories */}
                        <div className="flex flex-col gap-5 justify-between">

                            <Category
                                image={'cat1.png'}
                                title={'Dried Flower Bouquet'}
                                subTitle={'Popular!'}
                                content={'Shop our everlasting dried flower bouquets that could last for 1-2 years, depending on care and maintenance.'}
                            />

                            <Category
                                image={'cat2.png'}
                                title={'Crochet Bouquet'}
                                subTitle={'Popular!'}
                                content={'Collection of handcrafted crochet bouquets.'}
                                flipped={1}
                            />
                        </div>

                    </div>

                    {/* See Whats Popular */}
                    <div className="flex flex-col gap-5">
                        <p className='self-center text-2xl bg-accent-light w-full text-center py-5 font-bold text-accent-default'>See What's Popular</p>

                        <div className="flex flex-row overflow-auto gap-10 items-center py-10 px-10">
                            {popularProducts.map((product, index) => {
                                return <PopularCard key={index} index={index} product={product} />
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </>


    )
}

const Category = ({ image, title, subTitle, content, flipped = 0 }) => {
    return (
        <div className={`flex gap-10 ${flipped == 0 ? 'flex-row' : 'flex-row-reverse'}`}>

            <div className="flex flex-col items-center justify-center gap-2 flex-1">
                <p className='text-lg text-accent-default'>{subTitle}</p>
                <p className='text-2xl'>{title}</p>
                <p className='text-sm text-center max-w-[calc(75%)]'>{content}</p>
            </div>

            <div className="flex flex-1 justify-center items-center">
                <img className='' src={`/images/${image}`} alt="" />
            </div>

        </div>
    )
}

const PopularCard = ({ product, index }) => {
    return (
        <div className="flex flex-col aspect-square h-[280px] min-w-[280px] rounded-md shadow-md overflow-hidden">
            <div className="flex flex-1 aspect-square overflow-hidden">
                <img className="w-full object-cover" src={product.images[0].url} alt="product_image" />
            </div>

            <div className="flex flex-col p-2">
                <p className='text-lg py-2'>{product.name}</p>
                <p className='text-lg'> ₱ {product.pricing}</p>
            </div>
        </div>
    )
}

export default Home