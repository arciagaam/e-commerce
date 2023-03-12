import React, { useState, useEffect } from 'react'
import { auth, db } from '../../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
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
import AddOn from '../../../components/AddOn';
const ShowCollection = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [products, setProducts] = useState([]);
    const [addOns, setAddOns] = useState([]);
    const [dataCollection, setDataCollection] = useState([]);

    useEffect(() => {

        const getCollection = async () => {
            const docRef = doc(db, 'collections', params.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setDataCollection({...docSnap.data(), id:docSnap.id});
                setTitle(docSnap.data().title);
                setDescription(docSnap.data().description);
                setAddOns(docSnap.data().addons)
            } else {
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

    const handleSubmit = async () => {
        try {
            const  docRef = doc(db, 'collections', dataCollection.id);
            await updateDoc(docRef, {
                title: title,
                description: description,
                addons:addOns
            })
        } catch (err) {
            console.log(err);
        }
    }

    const handleAddOnChange = (index, e) => {
        const currentAddOns = [...addOns];

        if (e.target.name == 'name') {
            currentAddOns[index][e.target.name] = e.target.value
        } else {
            currentAddOns[index][e.target.name] = e.target.value
        }
        setAddOns(currentAddOns);
    }

    const onCreateAddOn = () => {
        const newAddOn = { name: '', price: '' };
        setAddOns((prevAddOns) => [...prevAddOns, newAddOn]);
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between items-center bg-white p-5 rounded-md shadow-sm">
                <div className="flex flex-row gap-4 items-center">
                    <button onClick={() => { navigate('./../') }} className="border border-accent-dark h-[30px] w-[30px] rounded-lg hover:bg-accent-default hover:text-white hover:font-bold hover:border-accent-default transition-all duration-100">{'<'}</button>
                    <p className='text-xl font-medium'>{title}</p>
                </div>
                <button onClick={handleSubmit} className='bg-accent-default text-white py-2 px-3 rounded-md hover:bg-accent-light'>Save</button>
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
                                return <Products key={index} product={product} />
                            })}

                        </div>

                        {/* <div className="flex flex-col justify-center items-center min-h-[50px] w-[20%] border">
                            Add products
                        </div> */}
                    </div>

                    <div className="flex flex-col gap-5 shadow-md p-5 bg-white rounded-md">
                        <p className='font-medium text-accent-default'>Add-Ons</p>

                        <div className="flex flex-col gap-2">
                            {addOns &&
                                addOns.map((addOn, index) => {
                                    return <AddOn key={index} addOn={addOn} index={index} handleAddOnChange={handleAddOnChange} />
                                })
                            }
                        </div>
                            <button onClick={onCreateAddOn} className='w-fit py-1 px-2 bg-accent-default text-white rounded-md'>Create Add-On</button>
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

const Products = ({ product }) => {
    return (
        <div className="flex flex-col justify-center items-center min-h-[50px] w-[20%] border">
            <p>{product.name}</p>
        </div>
    )
}

export default ShowCollection