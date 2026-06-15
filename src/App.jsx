import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { Wishlist, Login, Register, Account, Orders } from './pages/UserPages';
import {
  AdminLogin, AdminDashboard, AdminProducts, AdminOrders, AdminCategories
} from './pages/admin/AdminPages';

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* User */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<Orders />} />
          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          {/* 404 */}
          <Route path="*" element={
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
              <p className="font-mono text-gold text-sm tracking-widest mb-4">404</p>
              <h2 className="font-display text-4xl text-charcoal mb-4">Page Not Found</h2>
              <a href="/" className="btn-gold">Go Home</a>
            </div>
          } />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <StoreProvider>
        <AppLayout />
      </StoreProvider>
    </Router>
  );
}
