import React from 'react'
import { useState } from 'react'
import Dropdown from '../../components/Dropdown';
import ProductCard from '../../components/ProductCard';
import ProductQuickView from '../../components/ProductQuickView';

const ProductsList = () => {

    const [isActive, setIsActive] = useState(false)

    const handleClickEvent = () => {
        setIsActive(!isActive)
    }


    return (

        <div className="flex flex-col w-full gap-12">
            <div className="flex flex-col w-full items-center self-center gap-8">
                <p className="text-5xl">All Bouquets</p>

                <div className="flex flex-row justify-between gap-7 z-3">
                    <Dropdown title={'Category'} content={[
                        { label: 'All Bouquets', value: 'allBouquets' },
                        { label: 'Dried Flowers Bouquets', value: 'driedFlowersBouquet' },
                        { label: 'Crochet Bouquets', value: 'crochetBouquet' }
                    ]} />

                    <Dropdown title={'Filter'} content={[
                        { label: 'Price: Lowest to Highest', value: 'LtoH' },
                        { label: 'Price: Highest to Lowest', value: 'HtoL' }
                    ]} />
                </div>

            </div>

            <div className="relative grid grid-rows-2 grid-cols-5 w-full">
                <ProductCard
                    image={'cat2.png'}
                    productName={'1'}
                    handleClickEvent={handleClickEvent}
                />
                <ProductCard
                    image={'cat2.png'}
                    productName={'2'}
                    handleClickEvent={handleClickEvent}
                />
                <ProductCard
                    image={'cat2.png'}
                    productName={'3'}
                    handleClickEvent={handleClickEvent}
                />
                <ProductCard
                    image={'cat2.png'}
                    productName={'4'}
                    handleClickEvent={handleClickEvent}
                />
                <ProductCard
                    image={'cat2.png'}
                    productName={'5'}
                    handleClickEvent={handleClickEvent}
                />
                <ProductCard
                    image={'cat2.png'}
                    productName={'6'}
                    handleClickEvent={handleClickEvent}
                />
            </div>
            {isActive && <ProductQuickView/>}
        </div>
    )
}

export default ProductsList
