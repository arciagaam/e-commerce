import React from 'react'
import { useState, useEffect } from 'react'

function Rating({ name, rating, comment }) {

    const [ratings, setRatings] = useState(null);

    useEffect(() => {
        const temp = [];

        for (let i = 1; i <= rating; i++) {
            temp.push(<box-icon type='solid' name='star'></box-icon>);
        }

        setRatings(temp);
    }, [])

    return (
        <div className="flex bg-white">
            <div className="flex flex-col gap-2 p-2 flex-1">
                <div className="flex gap-5">
                    <div className="flex  bg-slate-200 p-2">
                        <box-icon size="md" type='solid' name='user'></box-icon>
                    </div>

                    <div className="flex flex-col justify-center">
                        <p>{name}</p>
                        <div className="flex flex-row gap-2">
                            <div>
                                {ratings && ratings.map((rating) => (
                                    rating
                                ))}
                            </div>
                            <p>({rating})</p>
                        </div>
                    </div>
                </div>

                <p className='bg-white w-full'>{comment}</p>
            </div>
        </div>
    )
}

export default Rating