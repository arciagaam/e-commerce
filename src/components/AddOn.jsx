import React from 'react'

const AddOn = ({ addOn, index, handleAddOnChange, addOns, setAddOns }) => {
    return (
        <div className="flex flex-row gap-10 items-center">

            <div className="flex flex-row gap-5">
                <div className="flex flex-col">
                    <label htmlFor={`${index}-name`}>Name</label>
                    <input className='border border-accent-dark/50 rounded-md px-2' type="text" name='name' value={addOn.name} onChange={e => handleAddOnChange(index, e)} />
                </div>

                <div className="flex flex-col">
                    <label htmlFor={`${index}-price`}>Price</label>
                    <input className='border border-accent-dark/50 rounded-md px-2' type="text" name='price' value={addOn.price} onChange={e => handleAddOnChange(index, e)} />
                </div>
            </div>

            <button className='justify-self-end self-end' onClick={() => setAddOns(addOns.filter((e)=> e !== addOn))}>Remove</button>
        </div>

    )
}

export default AddOn