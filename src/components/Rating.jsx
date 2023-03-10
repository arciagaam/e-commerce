import React from 'react'

function Rating() {
    return (
        <div className="flex bg-white">
            <div className="flex flex-col gap-2 p-2 flex-1">
                <div className="flex gap-5">
                    <div className="flex  bg-slate-200 p-2">
                    <img src='./images/cat1.png' className='w-[40px] h-[40px]'></img>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                        <p>name here</p>
                        <div className="flex">rating here</div>
                    </div>
                </div>
                
                <p className='bg-white w-full' disabled>testing comment asdasdasdasdasdasdasdsadasdasdasas</p>
            </div>
        </div>
    )
}

export default Rating