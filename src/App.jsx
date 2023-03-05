import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { Route, Routes } from 'react-router-dom';
//PAGES
import Home from './pages/Home';
import ShopLanding from './pages/ShopLanding';
import ProductsList from './pages/ProductsList';
import Navbar from './components/Navbar';
import AboutUs from './pages/AboutUs';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className='flex flex-col font-display min-h-screen'>

      <Routes>

        <Route path='/' element={<Navbar/>}>
          <Route index element={<Home />} />
          <Route path='shop' element={<ShopLanding />} />
          <Route path='products' element={<ProductsList />} />
          <Route path='about' element={<AboutUs />} />
        </Route>

        
        <Route path="*" element={<div>Page not Found!</div>}/>
      </Routes>

      <Footer />
    </div>
  )
}

export default App
