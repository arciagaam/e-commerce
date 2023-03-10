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
import { useNavigate } from 'react-router-dom';

const AddCollection = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


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
        <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between items-center bg-white p-5 rounded-md shadow-sm">
                <div className="flex flex-row gap-4 items-center">
                    <button onClick={()=>{navigate(-1)}} className="border border-accent-dark h-[30px] w-[30px] rounded-lg hover:bg-accent-default hover:text-white hover:font-bold hover:border-accent-default transition-all duration-100">{'<'}</button>
                    <p className='text-xl font-medium'>Create Collection</p>
                </div>
                <button onClick={handleSubmit} className='bg-accent-default text-white py-2 px-3 rounded-md hover:bg-accent-light'>Save</button>
            </div>

            <div className="flex flex-row gap-5">
                <div className="flex flex-col gap-5 flex-[2]">
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
                        <p className='font-medium text-accent-default'>Add products to collection</p>

                        <div className="border rounded-md p-1 px-2">
                            Add products
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 flex-1">
                    <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                        <p className='font-medium text-accent-default'>Collection image</p>

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

export default AddCollection