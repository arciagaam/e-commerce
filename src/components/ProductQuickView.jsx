import React from "react"
import NumberCounter from "./NumberCounter"

const ProductQuickView = () => {
    return (
        <div className='flex absolute inset-0 z-20 justify-center items-center bg-gray-900/25'>
            <div className="flex flex-row columns-2 gap-9 px-20 w-1/2 h-3/4 bg-gray-300">
                <div className="flex justify-self-center self-center">
                    <img src="/images/cat2.png" alt="" />
                </div>
                <div className="flex flex-col justify-self-center self-center gap-4">
                    <div className=" flex flex-col titlePrice gap-4 font-semibold">
                        <p className="text-2xl">Ligaya Crochet Bouquet</p>
                        <p className="text-2xl">₱500</p>
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
                        <NumberCounter/>
                        <button className="text-sm p-2 bg-[#EFE3D9]">Add to Cart</button>
                    </div>
                    

                </div>
            </div>
        </div>
    )

}

export default ProductQuickView