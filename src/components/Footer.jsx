import React from 'react'

const Footer = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[20vh] border-t border-accent-light bg-accent-light gap-2">
            <div className="flex flex-col items-center">
                <p className='text-3xl font-semibold'>Sinagtala.ph</p>
            </div>
            <div className="flex flex-col items-center">
                <p className='text-lg font-medium'>Sampaloc, Manila</p>
            </div>
            <div className="flex flex-row items-center gap-2">
                <a target="_blank" href="https://www.facebook.com/Sinagtala.flwr"><box-icon name='facebook-square' size='md' type='logo' color='#df687d' ></box-icon></a>
                <a target="_blank" href="https://www.instagram.com/sinag.talaph/"><box-icon name='instagram-alt' size='md' type='logo' color='#df687d' ></box-icon></a>
            </div>
        </div>
    )
}

export default Footer