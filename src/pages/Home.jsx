import React from 'react'

const Home = () => {
    return (
        <div className='flex flex-col w-full'>

        <div className="flex flex-col w-full gap-10">
            {/* Hero */}
            <div className="relative flex h-[60vh] justify-center items-center overflow-hidden">
                <div className="flex flex-col items-center z-[2] text-white gap-5">
                    <p className='text-4xl'>Dried Flower Bouquets</p>
                    <p className='text-lg'>Shop Now</p>
                </div>

                <div className="absolute inset-0 bg-hero bg-no-repeat bg-cover bg-center bg-black z-[1]">

                </div>
            </div>

            {/* Body */}

            <div className="flex flex-col px-10 gap-20">

                {/* Categories */}
                <div className="flex flex-col gap-5">
                    <p className='self-center'>Categories</p>

                    <Category
                        image={'cat1.png'}
                        title={'Dried Flower Bouquet'}
                        subTitle={'Lorem Ipsum'}
                        content={'Lorem ipsum dolor sit amet consectetur. Sed imperdiet mi massa convallis amet massa nisi nibh. Nisl hendrerit maecenas nec non arcu adipiscing. Molestie sagittis malesuada feugiat erat mattis malesuada quis. Nisi rhoncus a sed ullamcorper odio. Imperdiet ultrices quis faucibus ipsum sollicitudin vulputate vitae.'}
                    />

                    <Category
                        image={'cat2.png'}
                        title={'Crochet Bouquet'}
                        subTitle={'Lorem Ipsum'}
                        content={'Lorem ipsum dolor sit amet consectetur. Sed imperdiet mi massa convallis amet massa nisi nibh. Nisl hendrerit maecenas nec non arcu adipiscing. Molestie sagittis malesuada feugiat erat mattis malesuada quis. Nisi rhoncus a sed ullamcorper odio. Imperdiet ultrices quis faucibus ipsum sollicitudin vulputate vitae.'}
                        flipped={1}

                    />
                </div>

            </div>

            {/* See Whats Popular */}
            <div className="flex flex-col gap-5">
                <p className='self-center'>See What's Popular</p>

                <div className="flex flex-row overflow-auto px-10 gap-10">
                    <PopularCard image={'cat2.png'} title={'Title Sample'} price={'P 1,200'} />
                    <PopularCard image={'cat2.png'} title={'Title Sample'} price={'P 1,200'} />
                    <PopularCard image={'cat2.png'} title={'Title Sample'} price={'P 1,200'} />
                    <PopularCard image={'cat2.png'} title={'Title Sample'} price={'P 1,200'} />
                    <PopularCard image={'cat2.png'} title={'Title Sample'} price={'P 1,200'} />
                    <PopularCard image={'cat2.png'} title={'Title Sample'} price={'P 1,200'} />
                    <PopularCard image={'cat2.png'} title={'Title Sample'} price={'P 1,200'} />
                    <PopularCard image={'cat2.png'} title={'Title Sample'} price={'P 1,200'} />
                    <PopularCard image={'cat2.png'} title={'Title Sample'} price={'P 1,200'} />
                    <PopularCard image={'cat2.png'} title={'Title Sample'} price={'P 1,200'} />
                    <PopularCard image={'cat2.png'} title={'Title Sample'} price={'P 1,200'} />
                    <PopularCard image={'cat2.png'} title={'Title Sample'} price={'P 1,200'} />
                </div>
            </div>
        </div>


            <div className="flex flex-col items-center justify-center min-h-[40vh]">
                Footer
            </div>

        </div>
    )
}

const Category = ({ image, title, subTitle, content, flipped = 0 }) => {
    return (
        <div className={`flex gap-10 ${flipped == 0 ? 'flex-row' : 'flex-row-reverse'}`}>

            <div className="flex flex-col items-center justify-center gap-2 flex-1">
                <p className='text-lg'>{subTitle}</p>
                <p className='text-2xl'>{title}</p>
                <p className='text-sm text-center max-w-[calc(75%)]'>{content}</p>
            </div>

            <div className="flex flex-1 justify-center items-center">
                <img className='' src={`/images/${image}`} alt="" />
            </div>

        </div>
    )
}

const PopularCard = ({ image, title, price }) => {
    return (
        <div className="flex flex-col min-w-fit">
            <div className="flex">
                <img className="h-[240px] w-auto" src={`images/${image}`} alt="" />
            </div>

            <div className="flex flex-col">
                <p className='text-lg font-bold'>{title}</p>
                <p className='text-sm'>{price}</p>
            </div>
        </div>
    )
}

export default Home