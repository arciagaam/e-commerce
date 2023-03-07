import React, {useState} from 'react'

const NumberCounter = ({label}) => {
  
    const [count, setCount] = useState(0)

    return (
    <div className='flex gap-2'>
        <p>{label}</p>
        <div className='flex'>
            <button onClick={() => {setCount( (previousState) => previousState-=1)}}>-</button>
            <p>{count}</p>
            <button onClick={() => {setCount((previousState) => previousState+=1)}}>+</button>
        </div>
    </div>

  )
}

export default NumberCounter