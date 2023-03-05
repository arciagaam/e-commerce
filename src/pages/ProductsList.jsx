import React from 'react'
import { useState } from 'react'
import Dropdown from '../components/Dropdown';

const ProductsList = () => {

    // const Title = () => {
    //     return (
    //         <p className='text-5xl'>Hello</p>
    //     )
    // }

    const [selectedValue1, setSelectedValue1] = useState(null);
    const [selectedValue2, setSelectedValue2] = useState(null);

    const handleSelect1 = (value) => {
        setSelectedValue1(value)
    }

    const handleSelect2 = (value) => {
        setSelectedValue2(value)
    }

    // const [selected, setSelected] = useState(null)

    return (

        <div className="flex w-full">
            <div className="flex flex-col w-full items-center self-center gap-4">
                <p className="text-5xl">All Bouquets</p>
                
                <div className="flex flex-row justify-between gap-7">
                <Dropdown title={'Category'} content={[
                    { label: 'Option 1', value: 'option1' },
                    { label: 'Option 2', value: 'option2' }
                  ]}  />
            
                  <Dropdown title={'Filter'} content={[
                    { label: 'Option A', value: 'optionA' },
                    { label: 'Option B', value: 'optionB' }
                  ]}  />
                </div>
            </div>
        </div>
    )
}

export default ProductsList
