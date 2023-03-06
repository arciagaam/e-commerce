import React from 'react'

const ShopLanding = () => {
    return (
        <div className="relative flex w-full flex-1 after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:min-h-[50%] after:z-[-1] z-[-2] after:bg-white bg-[#EFE3D9]">
            <div className="bg-transparent flex flex-col justify-center items-center py-16 gap-y-12 ">
                
                <div className="flex flex-col w-3/5 items-center self-center gap-4">
                    <p className="text-4xl">Choose Your Type of Bouquet</p>
                    <p className='text-lg text-center'>Lorem ipsum dolor sit amet consectetur. Est vel luctus lectus fringilla fringilla diam ac. Congue fringilla accumsan vitae amet arcu mattis eu amet. Porttitor vitae ullamcorper quisque blandit sollicitudin laoreet tincidunt. Integer ut sit laoreet rutrum blandit amet lectus.</p>
                </div>
                <div className="flex flex-row rows-2 gap-x-48">
                    <CategoryCard
                        image={'cat2.png'}
                        category={'Crochet Bouquet'}
                        description={'Lorem ipsum dolor sit amet consectetur. Sed imperdiet mi massa convallis amet massa nisi nibh. Nisl hendrerit maecenas nec non arcu adipiscing. '}
                    />
                    <CategoryCard
                        image={'cat2.png'}
                        category={'Dried Flowers Bouquet'}
                        description={'Lorem ipsum dolor sit amet consectetur. Sed imperdiet mi massa convallis amet massa nisi nibh. Nisl hendrerit maecenas nec non arcu adipiscing. '}
                    />
                </div>
            </div>
        </div>
    )
}

const CategoryCard = ({ image, category, description }) => {
    return (
        <div className="flex flex-col columns-2 items-center w-96">
            <div className="flex">
                <img src={`/images/${image}`} alt="" />
            </div>
            <div className="flex flex-col py-5 px-6 items-center justify-center bg-[#F9F9F9]">
                <p className='text-2xl text-justify'>{category}</p>
                <p className="text-xs text-justify">{description}</p>
                <button className='bg-[#EFE3D9] mt-4 px-4 py-2'>Shop</button>
            </div>
        </div>
    )
}

export default ShopLanding
