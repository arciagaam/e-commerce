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
            <div className="flex flex-col h-[350px]">

                <div className="relative flex flex-1 cursor-pointer overflow-hidden bg-accent-light" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >
                    {
                        <div onClick={() => setIsActive(!isActive)} className={`${isHovering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[100%]'} z-[3] absolute flex bottom-0 w-full py-2 items-center justify-center text-white bg-accent-default cursor-pointer transition-all duration-500 ease-in-out`}>
                            <p>Quick View</p>
                        </div>
                    }
                    
                    <div className="relative inset-0 flex flex-col w-full h-full" onClick={() => {navigate(`/product/${product.id}`)}}>

                        {product.images.length > 1 && 
                        <img className={`${isHovering ? 'opacity-0' : 'opacity-100'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out z-[2]`} src={product.images[1].url} alt="" />
                        }

                        <img className='h-full w-full object-cover' src={product.images[0].url} alt="" />
                    </div>
                    
                </div>

                <div className="flex py-5 items-center justify-center bg-accent-light">
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