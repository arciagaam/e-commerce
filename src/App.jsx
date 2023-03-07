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
import Register from './pages/auth/Register';
import Profile from './pages/user/Profile';

import AdminNavbar from './components/AdminNavbar';
import Dashboard from './pages/admin/Dashboard';
import Inventory from './pages/admin/Inventory';
import Products from './pages/admin/products/Products';
import Orders from './pages/admin/Orders';
import Collections from './pages/admin/Collections';
import AddProduct from './pages/admin/products/AddProduct';

const App = () => {
  
  return (
    <>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path='shop' element={<ShopLanding />} />
            <Route path='products' element={<ProductsList />} />
            <Route path='about' element={<AboutUs />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='profile' element={<Profile />} />
          </Route>

          <Route path='/admin' element={<AdminNavbar />}>
            <Route index element={<Dashboard />}></Route>
            <Route path='orders' element={<Orders />}></Route>
            <Route path='products' element={<Products />}></Route>
            <Route path='products/add' element={<AddProduct />}></Route>
            <Route path='collections' element={<Collections />}></Route>
            <Route path='inventory' element={<Inventory />}></Route>
          </Route>

          <Route path="*" element={<div>Page not Found!</div>}/>
        </Routes>
    </>

  )
}

export default App
