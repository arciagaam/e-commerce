import React, {useState} from 'react'

const NumberCounter = ({label=null}) => {
  
    const [count, setCount] = useState(label == null ? 1 : 0);

    return (
    <div className={`flex ${label != null ? 'gap-2' : 'self-start'} items-center justify-between`}>
        <p>{label}</p>
        <div className='flex bg-gray-200 h-fit'>
            <button className='px-1.5' disabled={count < 1} onClick={() => {setCount( (previousState) => previousState-=1)}}>-</button>
            <p className='bg-white px-2'>{count}</p>
            <button className='px-1.5' onClick={() => {setCount((previousState) => previousState+=1)}}>+</button>
        </div>
    </div>

  )
}

export default NumberCounter