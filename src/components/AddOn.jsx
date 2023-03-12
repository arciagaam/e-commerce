import React from 'react'

const AddOn = ({addOn, index, handleAddOnChange}) => {
    return (
        <div className="flex flex-row gap-10">
            <div className="flex flex-col">
                <label htmlFor={`${index}-name`}>Name</label>
                <input className='border border-accent-dark/50 rounded-md px-2' type="text" name='name' value={addOn.name} onChange={e => handleAddOnChange(index, e)}/>
            </div>

            <div className="flex flex-col">
                <label htmlFor={`${index}-price`}>Price</label>
                <input className='border border-accent-dark/50 rounded-md px-2' type="text" name='price' value={addOn.price} onChange={e => handleAddOnChange(index, e)}/>
            </div>
        </div>
    )
}

export default AddOn