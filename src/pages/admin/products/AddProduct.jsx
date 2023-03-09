import React, { useState, useEffect } from 'react'
import { auth, db, storage } from '../../../firebase';
import {
    collection,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddProduct = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pricing, setPricing] = useState('');
    const [costPerItem, setCostPerItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);
    const [dropDownCollection, setDropDownCollection] = useState('')
    const [url, setUrl] = useState(null)
    const [collections, setCollections] = useState([]);

    

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleSubmit = async () => {
        try {
            const newProduct = await addDoc(collection(db, 'products'), {
                name: title,
                description: description,
                pricing: pricing,
                costPerItem: costPerItem,
                inventory: quantity,
                status: 1,
                type: 'Merchandise',
                collection: dropDownCollection,
                images: ['image']
            });

            const imageRef = ref(storage, `${newProduct.id}/${image.name}`);
            uploadBytes(imageRef, image).then(() => {
                getDownloadURL(imageRef).then((url) => {
                    setUrl(url);
                }).catch((err) => { console.warn(err, 'image getting the image.') });
                setImage(null);
            });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        const getCollections = async () => {

            const docRef = collection(db, 'collections');
            const docSnap = await getDocs(docRef);

            const temp = []

            docSnap.forEach(snap => {
                temp.push({ ...snap.data(), id: snap.id });
            })

            setCollections(temp);
        }

        getCollections();
    }, [])

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                    <button>{'<'}</button>
                    <p>Add Product</p>
                </div>
                <button onClick={handleSubmit}>Save</button>
            </div>

            <div className="flex flex-row gap-10">
                <div className="flex flex-col gap-10 flex-[2]">
                    <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                        <div className="flex flex-col">
                            <label htmlFor="title">Title</label>
                            <input onChange={(e) => { setTitle(e.target.value) }} type="text" name='title' id='title' className='border rounded-md p-1 px-2' />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="description">Description</label>
                            <textarea onChange={(e) => { setDescription(e.target.value) }} name="description" id="" cols="30" rows="4" className='resize-none border rounded-md p-1 px-2'></textarea>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                        <p>Media</p>

                        <div className="border rounded-md p-1 px-2">
                            {/* INPUT HERw */}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                        <p>Pricing</p>

                        <div className="flex flex-col">
                            <label htmlFor="price">Price</label>
                            <input onChange={(e) => { setPricing(e.target.value) }} type="number" name='price' id='price' className='border rounded-md p-1 px-2 w-fit' />
                        </div>

                        <hr />

                        <div className="flex flex-col">
                            <label htmlFor="cost-per-item">Cost per item</label>
                            <input onChange={(e) => { setCostPerItem(e.target.value) }} type="number" name='cost-per-item' id='cost-per-item' className='border rounded-md p-1 px-2 w-fit' />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-10 flex-1">
                    <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                        <p>Collections</p>

                        <div className="flex flex-col">
                            <label htmlFor="price">Add to collection</label>
                            <select name="collection" id="collection" className='border rounded-md p-1 px-2 w-full' onChange={(e) => { setDropDownCollection(e.target.value) }}>
                                <option value="none">None</option>
                                {collections.map((collection, index) => {
                                    return <option key={index} value={collection.id}>{collection.title}</option>
                                })}
                            </select>
                        </div>
                    </div>


                    <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                        <p>Inventory</p>

                        <div className="flex flex-col">
                            <label htmlFor="price">Quantity</label>
                            <input onChange={(e) => { setQuantity(e.target.value) }} type="number" name='price' id='price' className='border rounded-md p-1 px-2 w-full' />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default AddProduct