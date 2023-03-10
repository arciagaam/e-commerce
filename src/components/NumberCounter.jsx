import React, {useState} from 'react'

const NumberCounter = ({label}) => {
  
    const [count, setCount] = useState(0)

    return (
    <div className='flex gap-2'>
        <p>{label}</p>
        <div className='flex bg-gray-200'>
            <button className='px-1.5' disabled={count < 1} onClick={() => {setCount( (previousState) => previousState-=1)}}>-</button>
            <p className='bg-white px-2'>{count}</p>
            <button className='px-1.5' onClick={() => {setCount((previousState) => previousState+=1)}}>+</button>
        </div>
    </div>

  )
}

export default NumberCounter