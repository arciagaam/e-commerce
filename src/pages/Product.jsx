import React, {useState} from 'react';
import NumberCounter from '../components/NumberCounter';

const Product = () => {
    
    return (

    <div className="flex justify-center bg-slate-400 h-[600px] py-[50px] gap-[50px] px-[250px]">
        <div className="flex flex-1 bg-slate-100 justify-center">
            <img src='./images/cat1.png'></img>
        </div>
        <div className="flex flex-1 flex-col  bg-slate-300">
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

            <div className="flex flex-col">
                <p>Add-on:</p>
                <div className="flex">
                    <NumberCounter label={'Ferrero'}/>

                    
                </div>
            </div>
            
        </div>
    </div>

    )
}

export default Product