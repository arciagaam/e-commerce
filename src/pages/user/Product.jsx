import React, {useState} from 'react';
import NumberCounter from '../../components/NumberCounter';
import Rating from '../../components/Rating';

const Product = () => {

    const [IsActive, setIsActive] = useState(false)

    const submit = (event) => {
        alert('pasok')
    }

    return (
    <div className="flex flex-col items-center justify-center h-full gap-16 px-20">

        {/* Product Details */}
        <div className="flex justify-center gap-12 bg-slate-100 p-20 w-full">
            <div className="flex justify-center">
                <img src='./images/cat1.png'></img>
            </div>
            <div className="flex flex-col ">
                <div className="flex flex-col">
                    <p className='text-4xl'>Dried Flower Bouqet</p>
                    <p className='text-2xl'>Php 549.00</p>
                </div>
                
                <div className="flex flex-col pt-5 ">
                    <p className='text-l font-bold'>Inclusion:</p>
                    <p className='text-m'>Dried Flower Bouqet</p>
                    <p className='text-m'>Fairy Lights</p>
                    <p className='text-m'>14" Box</p>
                </div>

                <div className="flex flex-col pt-5">
                    <p className='font-bold'>Add-on:</p>
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-1">
                            <NumberCounter label={'Ferrero Rocher Heart'}/>
                            <NumberCounter label={'Toblerone'}/>
                            <NumberCounter label={'Hershey'}/>
                            <NumberCounter label={'Kitkat'}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <NumberCounter label={'Crochet Tulip'}/>
                            <NumberCounter label={'Crochet Lavender'}/>
                            <NumberCounter label={'Crochet Sunflower'}/>
                            <NumberCounter label={'Crochet Daisy'}/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-10">
                    <button className="bg-[#EFE3D9] px-6 py-3" onClick={submit}>Order Now</button>
                </div>
            </div>
        </div>

        {/* Comment Section */}
        <div className="flex flex-col w-full  bg-slate-100 p-8 gap-2">
            <div className="flex w-[75%]">Product Ratings</div>
            <Rating/>
            <Rating/>
            
        </div>
    </div>
    )
}

export default Product