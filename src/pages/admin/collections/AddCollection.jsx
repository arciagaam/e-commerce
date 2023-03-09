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

const AddCollection = () => {

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
        <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                    <button>{'<'}</button>
                    <p>Create Collection</p>
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
                        <p>Add products to collection</p>

                        <div className="border rounded-md p-1 px-2">
                            Add products
                        </div>
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

export default AddCollection