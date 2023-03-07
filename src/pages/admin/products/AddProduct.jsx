import React, { useState } from 'react'
import { auth, db } from '../../../firebase';
import {
    collection,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
const AddProduct = () => {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pricing, setPricing] = useState('');
    const [costPerItem, setCostPerItem] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async () => {
        
        try{
            await addDoc(collection(db, 'products'), {
                name:title,
                description:description,
                pricing: pricing,
                costPerItem: costPerItem,
                inventory: quantity,
                status: 1,
                type: 'Merchandise'
            })
        }catch (err) {
            console.log(err);
        }

    }


    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                    <button>{'<'}</button>
                    <p>Add Product</p>
                </div>
                <button onClick={handleSubmit}>Save</button>
            </div>

            <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                <div className="flex flex-col">
                    <label htmlFor="title">Title</label>
                    <input onChange={(e)=>{setTitle(e.target.value)}} type="text" name='title' id='title' className='border rounded-md p-1 px-2'/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description">Description</label>
                    <textarea onChange={(e)=>{setDescription(e.target.value)}} name="description" id="" cols="30" rows="4" className='resize-none border rounded-md p-1 px-2'></textarea>
                </div>
            </div>

            <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                <p>Media</p>

                <div className="border rounded-md p-1 px-2">
                    Add media
                </div>
            </div>

            <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                <p>Pricing</p>

                <div className="flex flex-col">
                    <label htmlFor="price">Price</label>
                    <input onChange={(e)=>{setPricing(e.target.value)}} type="number" name='price' id='price' className='border rounded-md p-1 px-2 w-fit'/>
                </div>

                <hr />

                <div className="flex flex-col">
                    <label htmlFor="cost-per-item">Cost per item</label>
                    <input onChange={(e)=>{setCostPerItem(e.target.value)}} type="number" name='cost-per-item' id='cost-per-item' className='border rounded-md p-1 px-2 w-fit'/>
                </div>
            </div>

            <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                <p>Inventory</p>

                <div className="flex flex-col">
                    <label htmlFor="price">Quantity</label>
                    <input onChange={(e)=>{setQuantity(e.target.value)}} type="number" name='price' id='price' className='border rounded-md p-1 px-2 w-fit'/>
                </div>
            </div>
        </div>
    )
}

export default AddProduct