import React, { useState, useEffect } from 'react'
import { auth, db } from '../../../firebase';
import { useParams } from 'react-router-dom';
import {
    collection,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    getDoc,
    doc,
    deleteDoc,
    where,
    query
} from "firebase/firestore";

const ShowCollection = () => {
    const params = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [products, setProducts] = useState([]);
    const [dataCollection, setDataCollection] = useState([]);

    useEffect(() => {

        const getCollection = async () => {
            const docRef = doc(db, 'collections', params.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setDataCollection(docSnap.data());
                setTitle(docSnap.data().title);
                setDescription(docSnap.data().description);
            }else {
                console.log('Collection not found.');
            }
        }


        const getProducts = async () => {
            const docRef = collection(db, 'products');
            const q = query(docRef, where('collection', '==', params.id))
            const querySnapshot = await getDocs(q);
            
            const temp = []

            querySnapshot.forEach(snap => {
                temp.push(snap.data());
            })
            setProducts(temp);
        }

        getCollection();
        getProducts();
    }, []);
    
    const handleSubmit = async() => {
        try {
            await addDoc(collection(db, 'collections'), {
                title: title,
                description: description,
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                    <button>{'<'}</button>
                    <p></p>
                </div>
                <button onClick={handleSubmit}>Save</button>
            </div>

            <div className="flex flex-row gap-10">
                <div className="flex flex-col gap-10 flex-[2]">
                    <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                        <div className="flex flex-col">
                            <label htmlFor="title">Title</label>
                            <input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" name='title' id='title' className='border rounded-md p-1 px-2' />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="description">Description</label>
                            <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} name="description" id="" cols="30" rows="4" className='resize-none border rounded-md p-1 px-2'></textarea>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                        <p>Products in collection</p>

                        <div className="flex flex-row flex-wrap">

                            {products.map((product, index) => {
                                return <Products key={index} product={product}/>
                            })}

                        </div>

                        {/* <div className="flex flex-col justify-center items-center min-h-[50px] w-[20%] border">
                            Add products
                        </div> */}
                    </div>
                </div>

                <div className="flex flex-col gap-10 flex-1">
                    <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                        <p>Collection image</p>

                        <div className="flex flex-col">
                            <label htmlFor="price">Add image</label>
                            <input type="file" />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

const Products = ({product}) => {
    return (
        <div className="flex flex-col justify-center items-center min-h-[50px] w-[20%] border">
            <p>{product.name}</p>
        </div>
    )
}

export default ShowCollection