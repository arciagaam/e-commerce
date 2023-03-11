import React from 'react'

const ManageAccount = () => {
    return (
        <div className="flex flex-col gap-5 bg-zinc-200 p-5 shadow-sm">
            <table className='table-auto text-left p-36'>
                <thead>
                    <tr className='bg-white'>
                        <th className='font-normal px-5'>Full Name</th>
                        <th className='font-normal px-5'>Address</th>
                        <th className='font-normal px-5'>Postcode</th>
                        <th className='font-normal px-5'>Phone Number</th>
                        <th className='font-normal px-5'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-sm border-b-cyan-600'>
                        <td className='p-5'>Name mong napakahaba</td>
                        <td className='p-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</td>
                        <td className='p-5'>Manila - Sampaloc - Brgy. 1234</td>
                        <td className='p-5'>+(63) 912 345 6789</td>
                        <td className='p-5'><button className='text-cyan-600'>Edit</button></td>
                    </tr>
                </tbody>
            </table>
            <div className='flex flex-col justify-end'>
                <button className='w-56 p-3 text-lg bg-accent-default'>+ ADD NEW ADDRESS</button>
            </div>
        </div>
    )
}

export default ManageAccount