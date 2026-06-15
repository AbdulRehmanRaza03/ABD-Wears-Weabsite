import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_PRODUCTS, ADMIN_CREDS } from '../data/store';

const StoreContext = createContext(null);

const load = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};
const save = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => load('abd_products', INITIAL_PRODUCTS));
  const [cart, setCart] = useState(() => load('abd_cart', []));
  const [wishlist, setWishlist] = useState(() => load('abd_wishlist', []));
  const [orders, setOrders] = useState(() => load('abd_orders', []));
  const [user, setUser] = useState(() => load('abd_user', null));
  const [adminAuth, setAdminAuth] = useState(() => load('abd_admin', false));
  const [toast, setToast] = useState(null);

  useEffect(() => { save('abd_products', products); }, [products]);
  useEffect(() => { save('abd_cart', cart); }, [cart]);
  useEffect(() => { save('abd_wishlist', wishlist); }, [wishlist]);
  useEffect(() => { save('abd_orders', orders); }, [orders]);
  useEffect(() => { save('abd_user', user); }, [user]);
  useEffect(() => { save('abd_admin', adminAuth); }, [adminAuth]);

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // CART
  const addToCart = useCallback((product, size, color, qty = 1) => {
    setCart(prev => {
      const key = `${product.id}-${size}-${color}`;
      const existing = prev.find(i => i.key === key);
      if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, size, color, qty, key }];
    });
    showToast('Added to cart!');
  }, [showToast]);

  const removeFromCart = useCallback((key) => {
    setCart(prev => prev.filter(i => i.key !== key));
  }, []);

  const updateQty = useCallback((key, qty) => {
    if (qty < 1) return;
    setCart(prev => prev.map(i => i.key === key ? { ...i, qty } : i));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // WISHLIST
  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const has = prev.find(i => i.id === product.id);
      if (has) { showToast('Removed from wishlist'); return prev.filter(i => i.id !== product.id); }
      showToast('Added to wishlist!');
      return [...prev, product];
    });
  }, [showToast]);

  const isWishlisted = useCallback((id) => wishlist.some(i => i.id === id), [wishlist]);

  // ORDERS
  const placeOrder = useCallback((customerInfo) => {
    const order = {
      id: `ABD-${Date.now()}`,
      items: [...cart],
      total: cartTotal,
      customer: customerInfo,
      status: 'Pending',
      date: new Date().toISOString(),
      userId: user?.email || 'guest',
    };
    setOrders(prev => [order, ...prev]);
    clearCart();
    showToast('Order placed successfully! 🎉');
    return order;
  }, [cart, cartTotal, clearCart, user, showToast]);

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  }, []);

  // USER AUTH
  const register = useCallback((name, email, password) => {
    const users = load('abd_users', []);
    if (users.find(u => u.email === email)) { showToast('Email already exists', 'error'); return false; }
    const newUser = { name, email, password, createdAt: new Date().toISOString() };
    save('abd_users', [...users, newUser]);
    setUser({ name, email });
    showToast(`Welcome, ${name}!`);
    return true;
  }, [showToast]);

  const login = useCallback((email, password) => {
    const users = load('abd_users', []);
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) { showToast('Invalid credentials', 'error'); return false; }
    setUser({ name: found.name, email: found.email });
    showToast(`Welcome back, ${found.name}!`);
    return true;
  }, [showToast]);

  const logout = useCallback(() => {
    setUser(null);
    showToast('Logged out');
  }, [showToast]);

  // ADMIN AUTH
  const adminLogin = useCallback((username, password) => {
    if (username === ADMIN_CREDS.username && password === ADMIN_CREDS.password) {
      setAdminAuth(true);
      return true;
    }
    showToast('Invalid admin credentials', 'error');
    return false;
  }, [showToast]);

  const adminLogout = useCallback(() => {
    setAdminAuth(false);
  }, []);

  // PRODUCT MANAGEMENT (admin)
  const addProduct = useCallback((product) => {
    const newP = { ...product, id: Date.now(), rating: 0, reviews: 0 };
    setProducts(prev => [newP, ...prev]);
    showToast('Product added!');
    return newP;
  }, [showToast]);

  const updateProduct = useCallback((id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Product updated!');
  }, [showToast]);

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted');
  }, [showToast]);

  const getUserOrders = useCallback(() => {
    if (!user) return [];
    return orders.filter(o => o.userId === user.email);
  }, [orders, user]);

  return (
    <StoreContext.Provider value={{
      products, cart, wishlist, orders, user, adminAuth, toast,
      addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount,
      toggleWishlist, isWishlisted,
      placeOrder, updateOrderStatus, getUserOrders,
      register, login, logout,
      adminLogin, adminLogout,
      addProduct, updateProduct, deleteProduct,
      showToast,
    }}>
      {children}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[9999] toast px-5 py-3 text-sm font-body font-medium shadow-lg ${
          toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-charcoal text-cream'
        }`}>
          {toast.msg}
        </div>
      )}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be inside StoreProvider');
  return ctx;
};
