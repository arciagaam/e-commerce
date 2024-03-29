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
    const [selectedFilter, setSelectedFilter] = useState({})

    const callbackCollection = (selectedOption) => {
        setSelectedCollection(selectedOption);
    }

    const callbackFilter = (selectedOption) => {
        setSelectedFilter(selectedOption);
    }

    useEffect(() => {
        const getProductList = async () => {
            if (selectedCollection.id) {
                const docRef = collection(db, 'products')
                const q = query(docRef, where('collection', '==', selectedCollection.id));
                const docSnap = await getDocs(q)

                const data = []

                docSnap.forEach((snap) => {
                    data.push({ ...snap.data(), id: snap.id })
                })
                setProductList(data)
            }
        }

        getProductList();
    }, [selectedCollection])

    useEffect(() => {
        if (selectedFilter.id == 'LtoH') {
            setProductList((prevProductList) => prevProductList.sort((a, b) => b.pricing - a.pricing));
        }

        if (selectedFilter.id == 'HtoL') {
            setProductList((prevProductList) => prevProductList.sort((a, b) => a.pricing - b.pricing));
        }
    }, [selectedFilter])

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

    return (

        <div className="flex flex-col w-full gap-12 flex-1">
            <div className="flex flex-col w-full items-center self-center gap-8">
                <p className="text-5xl">Bouquets</p>

                <div className="flex flex-row justify-between gap-7 z-3">
                    <Dropdown
                        title={'Category'}
                        content={collections}
                        setSelectedColl={callbackCollection}
                    />

                    <Dropdown
                        title={'Filter'}
                        content={[
                            { title: 'Price: Lowest to Highest', id: 'LtoH' },
                            { title: 'Price: Highest to Lowest', id: 'HtoL' }
                        ]}
                        setSelectedFilter={callbackFilter}
                    />
                </div>

            </div>

            <div className="grid grid-cols-5 w-full h-full">
                {
                    productList.map((product, index) => {
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
