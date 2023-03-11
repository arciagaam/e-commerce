import React from 'react'
import { useState } from 'react'
import ProductQuickView from './ProductQuickView'
import cat1 from '../../public/images/cat1.png'

const ProductCard = ({ productName, productPrice, index, productImages, product }) => {

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
            {/* <div className="flex flex-col columns-2">
                <div className="flex relative justify-center overflow-hidden h-96" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {isHovering && (
                        <div className="flex items-center justify-center cursor-pointer z-[2] bg-neutral-800/50 text-gray-300 w-full"
                            onClick={() => setIsActive(!isActive)}>
                            <p className='text-lg'>Quick View</p>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-cover bg-center">
                        <img src={productImages[index]} alt="" />
                    </div>
                </div>

                <div className="flex p-5 items-center justify-center">
                    <p>{productName}</p>
                </div>
            </div> */}

            <div className="flex flex-col min-h-[280px]" >

                <div className="relative flex flex-1 cursor-pointer overflow-hidden" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {
                        <div onClick={() => setIsActive(!isActive)} className={`${isHovering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[100%]'} z-[3] absolute flex bottom-0 w-full py-2 items-center justify-center text-white bg-accent-default cursor-pointer transition-all duration-500`}>
                            <p>Quick View</p>
                        </div>
                    }
                    <img className={`${isHovering ? 'opacity-0' : 'opacity-100'} object-cover z-[2] transition-opacity duration-500`} src="images/cat1.png" alt="" />
                    <img className='absolute h-full object-cover z-[1]' src="images/cat2.png" alt="" />
 
                    
                </div>

                <div className="flex py-5 items-center justify-center">
                    <p>{productName}</p>
                </div>

            </div>




            {isActive && <ProductQuickView
                index={index}
                productName={productName}
                productPrice={productPrice}
                isActive={isActive}
                setIsActive={setIsActive}
                productImages={productImages}
                product={product}
            />}
        </>

    )
}

export default ProductCard