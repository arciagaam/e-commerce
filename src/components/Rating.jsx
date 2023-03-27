import React from 'react'
import { useState, useEffect } from 'react'
import { db, storage, auth } from '../firebase';
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    doc,
    query,
    where
} from 'firebase/firestore';
import Star from './Star';

function Rating({ name, rating, comment, hasOrdered }) {

    const [ratings, setRatings] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const temp = [];

        for (let i = 1; i <= rating; i++) {
            temp.push(<box-icon type='solid' name='star'></box-icon>);
        }

        setRatings(temp);

        const getName = async () => {
            if (hasOrdered) {
                const { uid } = JSON.parse(localStorage.getItem('user'));
                const userRef = doc(db, 'users', uid);
                const userDoc = await getDoc(userRef);

                setUsername(userDoc.data().full_name);
                console.log(hasOrdered);
            }

        }
        getName();

    }, [])

    useEffect(() => {
        console.log(username);
    }, [username])

    return (
        <div className="flex bg-white">

            {hasOrdered ?
                <div className="flex flex-col gap-2 p-2 flex-1">
                    <div className="flex flex-row gap-5 items-center">
                        <div className="flex  bg-slate-200 p-2">
                            <box-icon size="md" type='solid' name='user'></box-icon>
                        </div>

                        <div className="flex flex-col justify-center gap-2">
                            <p>{username}</p>
                            <div className="flex flex-row gap-2">
                                <div>
                                    {[1,2,3,4,5].map((index) => {
                                        return (
                                            <Star/>
                                        )
                                    })}
                                </div>
                                {/* <p>({rating})</p> */}
                            </div>
                            <div className="flex flex-row gap-7">
                                <textarea name="" id="" cols="100" rows="2"></textarea>
                                <button className='bg-accent-default p-1 rounded-md'>Submit</button>
                            </div>
                        </div>
                    </div>


                </div>
                :
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

            }

        </div>
    )
}

export default Rating