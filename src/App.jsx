import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { Route, Routes } from 'react-router-dom';
//PAGES
import Home from './pages/Home';
import ShopLanding from './pages/ShopLanding';
import ProductsList from './pages/ProductsList';

const App = () => {
  return (
    <div className='font-display'>
      <ul className='flex flex-row w-full bg-slate-300 py-3'>
        <li>A</li>
        <li>b</li>
        <li>c</li>
        <li>d</li>
      </ul>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route index path='/shop' element={<ShopLanding />} />
        <Route index path='/products' element={<ProductsList />} />
      </Routes>
    </div>
  )
}

export default App
