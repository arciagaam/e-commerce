import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { Route, Routes } from 'react-router-dom';
//PAGES
import Home from './pages/Home';
import ShopLanding from './pages/ShopLanding';
import ProductsList from './pages/ProductsList';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className='font-display'>

      <Routes>

        <Route path='/' element={<Navbar/>}>
          <Route index element={<Home />} />
          <Route path='shop' element={<ShopLanding />} />
          <Route path='products' element={<ProductsList />} />
        </Route>

        
        <Route path="*" element={<div>Page not Found!</div>}/>
      </Routes>
    </div>
  )
}

export default App
