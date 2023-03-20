import React, {useState, useEffect} from 'react'

const NumberCounter = ({label=null, type, price, setCounter=null, setAddOnDetails=null, initialValue=null}) => {
  
    const [count, setCount] = useState(type == 'product' ? 1 : 0);
    const [details, setDetails] = useState({});

    useEffect(() => {
        switch(type) {
            case 'product' : setCount(initialValue??1); break;
            case 'addOns' : setCount(initialValue??0); break;
 
        }
    },[])

    useEffect(() => {
        setCounter({count:count, name: label, type});
    }, [count])

    // useEffect(() => {

    //     if (label) {
    //         setDetails(() => {
    //             return {name: label, quantity: count, price: price};
    //         })
    //     } else {
    //         setCounter(count);
    //     }
    // }, [count])

    // useEffect(() => {
    //     if (details && setAddOnDetails) {
    //         setAddOnDetails(details);
    //     }
    // },[details])

    return (
    <div className={`flex ${label != null ? 'gap-2' : 'self-start'} items-center justify-between`}>
        <p>{label} {price && `₱ ${price}`}</p>
        <div className='flex bg-gray-200 h-fit'>
            <button className='px-1.5' disabled={count < 1} onClick={() => {setCount( (previousState) => previousState-=1)}}>-</button>
            <p className='bg-white px-2'>{count}</p>
            <button className='px-1.5' onClick={() => {setCount((previousState) => previousState+=1)}}>+</button>
        </div>
    </div>

  )
}

export default NumberCounter