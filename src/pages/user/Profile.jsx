import React from 'react'

const Profile = () => {
    return (
        <div className="flex flex-row columns-2 h-auto px-52">
            <div className="flex w-1/5">
                <ul>
                    <li>Manage My Account</li>
                    <li>My Profile</li>
                    <li>Address Book</li>
                </ul>
            </div>
            <div className="flex flex-col w-4/5 gap-5">
                <p className='text-2xl'>Manage My Account</p>
                <div className="flex flex-row columns-2 gap-3 h-60">
                    <div className="flex flex-col w-1/3 pl-3 pt-3 gap-3 bg-zinc-200 shadow-md">
                        <p className='text-lg'>Personal Profile</p>
                        <p className='text-sm'>Name mong napakahaba</p>
                    </div>
                    <div className="flex flex-col w-2/3 gap-3 bg-zinc-200 shadow-md">
                        <p className='text-lg pl-3 pt-3'>Address Book</p>
                        <div className="flex flex-row columns-2">
                            <div className="flex flex-col w-1/2 pl-3 pr-4 gap-2">
                                <p className='text-sm'>DEFAULT SHIPPING ADDRESS</p>
                                <p className='text-sm font-semibold'>Name mong napakahaba</p>
                                <p className='text-xs'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <p className='text-xs'>+(63) 912 345 6789</p>

                            </div>
                            <div className="flex flex-col w-1/2 pl-3 pr-4 gap-2">
                                <p className='text-sm'>DEFAULT BILLING ADDRESS</p>
                                <p className='text-sm font-semibold'>Name mong napakahaba</p>
                                <p className='text-xs'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <p className='text-xs'>+(63) 912 345 6789</p>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col shadow-md border-2">
                    <div className='bg-zinc-200 p-4'>
                        <p className='text-lg'>Recent Orders</p>
                    </div>
                    <table className='table-auto text-left'>
                        <thead>
                            <tr>
                                <th>Order No.</th>
                                <th>Placed on</th>
                                <th>Items</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>123456789</td>
                                <td>28/12/22</td>
                                <td>Crochet Bouquet</td>
                                <td>₱90.00</td>
                            </tr>
                            <tr>
                                <td>123456789</td>
                                <td>28/12/22</td>
                                <td>Crochet Bouquet</td>
                                <td>₱90.00</td>
                            </tr>
                            <tr>
                                <td>123456789</td>
                                <td>28/12/22</td>
                                <td>Crochet Bouquet</td>
                                <td>₱90.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Profile