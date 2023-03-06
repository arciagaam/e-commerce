import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { Route, Routes } from 'react-router-dom';
//PAGES
import Home from './pages/user/Home';
import ShopLanding from './pages/user/ShopLanding';
import ProductsList from './pages/user/ProductsList';
import Navbar from './components/Navbar';
import AboutUs from './pages/user/AboutUs';
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
