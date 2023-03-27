import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../firebase';

const AddressRow = ({ address, index, callbackAddress, userData }) => {

    const [name, setName] = useState(address.name);
    const [addressState, setAddressState] = useState(address.address);
    const [code, setCode] = useState(address.code);
    const [mobile, setMobile] = useState(address.mobile);

    const [editing, setEditing] = useState(false);

    const handleSave = () => {
        callbackAddress({data:{name,address:addressState,code,mobile}, index})
    }

    const handleSetDefault = async({type}) => {
        console.log(userData)
        const key = type == 'shipping' ? 'default_shipping' : 'default_billing';
        const docRef = doc(db, 'users', userData.id);
        await updateDoc(docRef, {
            [key]:index,
        });

        window.location.reload();
    }

    return (
        <div className="flex flex-row border-b border-accent-dark/30 gap-10 py-2">

            <div className="flex flex-col gap-1 flex-1">
                <p>Address {index + 1}</p>
                <input className={`border-none outline-none rounded-md px-2 py-1 w-full ${editing?'bg-white':'bg-transparent'}`} type="text" value={name} onChange={(e) => { setName(e.target.value) }} disabled={!editing} />
                <input className={`border-none outline-none rounded-md px-2 py-1 w-full ${editing?'bg-white':'bg-transparent'}`} type="text" value={addressState} onChange={(e) => { setAddressState(e.target.value) }} disabled={!editing} />
                <input className={`border-none outline-none rounded-md px-2 py-1 w-full ${editing?'bg-white':'bg-transparent'}`} type="text" value={code} onChange={(e) => { setCode(e.target.value) }} disabled={!editing} />
                <input className={`border-none outline-none rounded-md px-2 py-1 w-full ${editing?'bg-white':'bg-transparent'}`} type="text" value={mobile} onChange={(e) => { setMobile(e.target.value) }} disabled={!editing} />
            </div>

            <div className="flex flex-col justify-end items-end">
                <button onClick={()=>{handleSetDefault({type:'shipping'})}}>{userData.default_shipping == index ? 'Current default shipping address' : 'Set as default shipping address'}</button>
                <button onClick={()=>{handleSetDefault({type:'billing'})}}>{userData.default_billing == index ? 'Current default billing address' : 'Set as default billing address'}</button>
                <button onClick={editing ? ()=>{setEditing(!editing); handleSave()} : ()=>{setEditing(!editing);}}>{editing?'Save':'Edit'}</button>
            </div>

        </div>
    )
}

export default AddressRow