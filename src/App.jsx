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
import Login from './pages/auth/Login';
import Product from './pages/Product';
import Profile from './pages/user/Profile';
import ManageAccount from './components/profile/ManageAccount';
import MyProfile from './components/profile/MyProfile';
import AddressBook from './components/profile/AddressBook';

const App = () => {
  return (
    <div className='flex flex-col font-display min-h-screen'>

      <Routes>

        <Route path='/' element={<Navbar/>}>
          <Route index element={<Home />} />
          <Route path='shop' element={<ShopLanding />} />
          <Route path='products' element={<ProductsList />} />
          <Route path='about' element={<AboutUs />} />
          <Route path='login' element={<Login />} />
          <Route path='product' element={<Product/>} />
          <Route path='profile' element={<Profile/>}>
            <Route index path='manageaccount' element={<ManageAccount/>}/>
            <Route path='myprofile' element={<MyProfile/>}/>
            <Route path='addressbook' element={<AddressBook/>}/>
          </Route>
        </Route>

        
        <Route path="*" element={<div>Page not Found!</div>}/>
      </Routes>

      <Footer />
    </div>
  )
}

export default App
