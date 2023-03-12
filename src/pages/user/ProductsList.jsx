import React from 'react'
import { useState, useEffect } from 'react'
import Dropdown from '../../components/Dropdown';
import ProductCard from '../../components/ProductCard';
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
    query,
    where,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

const ProductsList = () => {

    const [productList, setProductList] = useState([])
    const [productImages, setProductImages] = useState([])
    const [collections, setCollections] = useState([])
    const [selectedCollection, setSelectedCollection] = useState({})

    const callbackFunction = (selectedOption) => {
        setSelectedCollection(selectedOption);
    }

    useEffect(() => {
        const getProductList = async () => {
            console.log(selectedCollection.id);
            const docRef = collection(db, 'products')
            const q = query(docRef, where('collection', '==', selectedCollection.id));
            const docSnap = await getDocs(q)

            const data = []

            docSnap.forEach((snap) => {
                console.log(snap.data().collection);
                console.log(selectedCollection.id);
                data.push({ ...snap.data(), id: snap.id })
            })

            setProductList(data)

        }

        getProductList();
    }, [selectedCollection])

    useEffect(() => {

        const getCollections = async () => {

            const docRef = collection(db, 'collections');
            const docSnap = await getDocs(docRef);

            const temp = []

            docSnap.forEach(snap => {
                temp.push({ ...snap.data(), id: snap.id });
            })

            setCollections(temp);

            collections.forEach((collection) => {
                var tempObj = {}
                tempObj.label = collection.title,
                    // tempObj.value = collection.title.split(' ').join('')
                    tempObj.value = collection.id

                setCollections((prevCollections) => prevCollections.concat(tempObj))

            })

        }

        getCollections()

    }, [])

    useEffect(() => {
        if (productList) {
            productList.forEach(async (product) => {
                const productImage = product.images[0]
                const imageRef = ref(storage, `${product.id}/${productImage}`)
                await getDownloadURL(imageRef).then((url => {
                    setProductImages((prevProducts) => prevProducts.concat(url))
                }))
            })
        }
    }, [productList])

    return (

        <div className="flex flex-col w-full gap-12">
            <div className="flex flex-col w-full items-center self-center gap-8">
                <p className="text-5xl">Bouquets</p>

                <div className="flex flex-row justify-between gap-7 z-3">
                    <Dropdown
                        title={'Category'}
                        content={collections}
                        setSelected={callbackFunction}
                    />

                    <Dropdown title={'Filter'} content={[
                        { title: 'Price: Lowest to Highest', id: 'LtoH' },
                        { title: 'Price: Highest to Lowest', id: 'HtoL' }
                    ]} />
                </div>

            </div>

            <div className="relative grid grid-rows-2 grid-cols-5 w-full">
                {productList.map((product, index) => {
                    console.log(product)
                    return <ProductCard
                        key={index}
                        index={index}
                        product={product}
                        productName={product.name}
                        productPrice={product.costPerItem}
                        productImages={productImages}
                    />
                })}

            </div>
        </div>
    )
}

export default ProductsList
