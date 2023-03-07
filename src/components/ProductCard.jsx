import React from 'react'
import { useState } from 'react'

const ProductCard = ({ image, productName, handleClickEvent }) => {

    const [isHovering, setIsHovering] = useState(false)
    const [isActive, setIsActive] = useState(false);


    const handleMouseOver = () => {
        setIsHovering(true)
    }

    const handleMouseOut = () => {
        setIsHovering(false)
    }


    return (
        <>
            <div className="flex flex-col columns-2">
                <div className="flex relative justify-center overflow-hidden h-96" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {isHovering && (
                        <div className="flex items-center justify-center cursor-pointer z-[2] bg-neutral-800/50 text-gray-300 w-full"
                            onClick={handleClickEvent}>
                            <p className='text-lg'>Quick View</p>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-cover bg-center">
                        <img src={`/images/${image}`} alt="" />
                    </div>
                </div>

                <div className="flex p-5 items-center justify-center">
                    <p>{productName}</p>
                </div>
            </div>
            
        </>

    )
}

export default ProductCard