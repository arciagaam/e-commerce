import React from 'react'
import { useState } from 'react'
import ProductQuickView from './ProductQuickView'
import cat1 from '../../public/images/cat1.png'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ productName, productPrice, index, productImages, product }) => {

    const navigate = useNavigate();


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
            <div className="flex flex-col min-h-[280px]" >

                <div className="relative flex flex-1 cursor-pointer overflow-hidden" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >
                    {
                        <div onClick={() => setIsActive(!isActive)} className={`${isHovering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[100%]'} z-[3] absolute flex bottom-0 w-full py-2 items-center justify-center text-white bg-accent-default cursor-pointer transition-all duration-500 ease-in-out`}>
                            <p>Quick View</p>
                        </div>
                    }
                    <div className="relative inset-0 flex flex-col" onClick={() => {navigate(`/product/${product.id}`)}}>
                        <img className={`${isHovering ? 'opacity-0' : 'opacity-100'} h-full object-cover z-[2] transition-opacity duration-500 ease-in-out`} src={product.images[1].url} alt="" />
                        <img className='absolute h-full object-cover z-[1]' src={product.images[2].url} alt="" />
                    </div>
 
                    
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