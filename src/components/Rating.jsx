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

function Rating({ name, rating, comment, hasOrdered, productId }) {

    const [ratings, setRatings] = useState(null);
    const [username, setUsername] = useState('');
    const [hoverIndex, setHoverIndex] = useState(0);
    const [starRating, setStarRating] = useState(0);
    const [newReview, setNewReview] = useState({});
    const [message, setMessage] = useState('');

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        console.log(e.target.value);
    }

    const starHighlight = (index) => {
        return (index <= hoverIndex) || (index <= starRating)
    }

    const submitReview = async () => {
        const { uid } = JSON.parse(localStorage.getItem('user'));
        const reviewsRef = collection(db, `products/${productId}/reviews`);
        const review = {
            user_name: username,
            rating: starRating,
            comment: message,
            product_id: productId,
            user_id: uid
        }

        await addDoc(reviewsRef, review)
        .then(docRef => {
            console.log('Review submitted successfully!');
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        const temp = [];

        for (let i = 1; i <= rating; i++) {
            temp.push(<box-icon name='star' type='solid' color='#ffca28' ></box-icon>);
        }

        setRatings(temp);

        const getName = async () => {
            if (hasOrdered) {
                const { uid } = JSON.parse(localStorage.getItem('user'));
                const userRef = doc(db, 'users', uid);
                const userDoc = await getDoc(userRef);

                setUsername(userDoc.data().full_name);
            }

        }
        getName();

    }, [])

    useEffect(() => {
        console.log(starRating);
    }, [starRating])

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
                                <div className='flex flex-row'>
                                    {[1,2,3,4,5].map((index) => {
                                        return (
                                            <div 
                                                key={index}
                                                onMouseEnter={() => setHoverIndex(index)}
                                                onMouseLeave={() => setHoverIndex(0)}
                                                onClick={() => setStarRating(index)}>
                                            <Star
                                                yellow={starHighlight(index)}
                                            />
                                            </div>
                                            
                                        )
                                    })}
                                </div>
                                {/* <p>({rating})</p> */}
                            </div>
                            <div className="flex flex-row gap-7">
                                <textarea name="" id="" cols="100" rows="2" value={message} onChange={handleMessageChange}></textarea>
                                <button onClick={submitReview} className='bg-accent-default p-1 rounded-md'>Submit</button>
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