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
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/Profile';


const App = () => {
  return (
    <div className='relative flex flex-col font-display min-h-screen'>
      <Routes>

        <Route path='/' element={<Navbar/>}>
          <Route index element={<Home />} />
          <Route path='shop' element={<ShopLanding />} />
          <Route path='products' element={<ProductsList />} />
          <Route path='about' element={<AboutUs />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='profile' element={<Profile />} />
        </Route>

        
        <Route path="*" element={<div>Page not Found!</div>}/>
      </Routes>

      <Footer />
    </div>
  )
}

export default App
