import React, {useEffect} from 'react'

const Toast = ({message}) => {

  useEffect(()=>{
    setTimeout(()=>{
      localStorage.removeItem('message');
    }, 100);
  },[])

  return (
    <div className='absolute top-[-50px] self-center animate-toast z-10
    bg-white p-2 px-4 rounded-full shadow-sm'>{message}</div>
  )
}

export default Toast