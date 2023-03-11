import React from "react"
import { useNavigate } from "react-router-dom"
import NumberCounter from "./NumberCounter"

const ProductQuickView = ({productName, productPrice, isActive, setIsActive, index, productImages}) => {

    const navigate = useNavigate();

    const handleAddToCart = () => {

        if(localStorage.getItem('user')){
            
        }else {
            navigate('/login')
        }

    }

    return (
        <div className='flex absolute inset-0 z-20 justify-center items-center bg-gray-900/25'>
            <div className="flex flex-col gap-24 w-1/2 h-3/4 bg-gray-300">
                <div className="flex justify-end">
                    <button className="flex px-5 pt-2" onClick={() => setIsActive(false)}>X</button>
                </div>
                <div className="flex flex-row columns-2 gap-9 px-20 justify-center items-center">
                    <div className="flex">
                        <img src={productImages[index]} alt="" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className=" flex flex-col titlePrice gap-4 font-semibold">
                            <p className="text-2xl">{productName}</p>
                            <p className="text-2xl">₱{productPrice}</p>
                        </div>

                        <div className="inclusions">
                            <p className="text-normal font-semibold">Inclusions:</p>
                            <ul>
                                <li>1 Crochet Tulip</li>
                                <li>Fairy lights</li>
                                <li>14" box</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2">
                            <NumberCounter />
                            <button onClick={handleAddToCart} className="text-sm p-2 bg-[#EFE3D9]">Add to Cart</button>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )

}

export default ProductQuickView