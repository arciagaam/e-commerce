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
import AddOn from '../../../components/AddOn';

const AddCollection = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [addOns, setAddOns] = useState([]);

    const handleSubmit = async() => {
        try {
            const newCollection = await addDoc(collection(db, 'collections'), {
                title: title,
                description: description,
                addons: addOns
            })

            navigate(`./../${newCollection.id}`);
        } catch (err) {
            console.log(err);
        }
    }

    const handleAddOnChange = (index, e) => {
        const currentAddOns = [...addOns];

        if(e.target.name == 'name') {
            currentAddOns[index][e.target.name] = e.target.value
        }else{
            currentAddOns[index][e.target.name] = e.target.value
        }
        setAddOns(currentAddOns);
    }

    const onCreateAddOn = () => {
        const newAddOn = {name:'', price:''};
        setAddOns((prevAddOns) => [...prevAddOns, newAddOn]);
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