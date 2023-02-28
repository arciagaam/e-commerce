import React from 'react'
import { useState } from 'react'

const ProductsList = () => {

    // const Title = () => {
    //     return (
    //         <p className='text-5xl'>Hello</p>
    //     )
    // }

    const [selected, setSelected] = useState("")

    const Dropdown = ({ selected, setSelected, options }) => {
        const [isActive, setIsActive] = useState(false)


        return (
            <div className="dropdown w-48 m-auto p-2 relative">
                <div className="dropdown-btn p-2 bg-[#f4f4f4] shadow font-medium" onClick={(e) => setIsActive(!isActive)}>{selected}</div>
                {isActive && (
                    <div className="dropdown-content absolute top-14 left-2 p-2 bg-[#f4f4f4]">
                        {options.map(option => {
                            <div onClick={(e) => {
                                setSelected(option)
                                setIsActive(false)
                            }}
                                className="dropdown-item p-1 text-sm cursor-pointer hover:transition-all hover:bg-[#fefefe]">
                                {option}
                            </div>
                        })}
                    </div>
                )}

            </div>
        )

    }

    return (
        <div className="flex w-full">
            <div className="flex flex-col w-full items-center self-center gap-4">
                <p className="text-5xl">All Bouquets</p>
                <div className="flex flex-row justify-between gap-7">
                    <div className="flex  items-center ">
                        <p>Category: </p>
                        <Dropdown
                            selected={selected}
                            setSelected={setSelected}
                            options={["All Bouquets", "Crochet Bouquets", "Dried Flowers Bouquets"]}
                        />
                    </div>
                    <div className="flex  items-center ">
                        <p>Sort by: </p>
                        <Dropdown
                            selected={selected}
                            setSelected={setSelected}
                            options={["Price: Lowest to Highest", "Price: Highest to Lowest"]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsList
