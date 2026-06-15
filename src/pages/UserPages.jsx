import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Package, User, LogOut, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

// ==================== WISHLIST ====================
export function Wishlist() {
  const { wishlist } = useStore();
  if (wishlist.length === 0) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <Heart size={64} className="text-gray-200 mb-6" />
      <h2 className="font-display text-3xl text-charcoal mb-3">Your wishlist is empty</h2>
      <p className="font-body text-gray-500 mb-8">Save items you love for later</p>
      <Link to="/shop" className="btn-gold">Browse Products</Link>
    </div>
  );
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="mb-8">
        <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase mb-2">Saved Items</p>
        <h1 className="font-display text-4xl text-charcoal">My Wishlist</h1>
        <p className="font-body text-sm text-gray-500 mt-1">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

// ==================== LOGIN ====================
export function Login() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 300));
    const ok = login(form.email, form.password);
    setLoading(false);
    if (ok) navigate('/account');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-charcoal text-cream flex items-center justify-center font-display font-bold text-2xl mx-auto mb-4">A</div>
          <h1 className="font-display text-3xl text-charcoal">Welcome Back</h1>
          <p className="font-body text-sm text-gray-500 mt-2">Sign in to your ABD Wears account</p>
        </div>
        <div className="bg-white p-8 shadow-sm">
          <form onSubmit={handle} className="space-y-5">
            <div>
              <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@email.com" required className="input-field" />
            </div>
            <div>
              <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••" required className="input-field pr-12" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="btn-gold w-full text-center flex items-center justify-center gap-2">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="font-body text-sm text-center text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold hover:text-gold-dark font-medium transition-colors">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// ==================== REGISTER ====================
export function Register() {
  const { register } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handle = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 300));
    const ok = register(form.name, form.email, form.password);
    setLoading(false);
    if (ok) navigate('/account');
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-charcoal text-cream flex items-center justify-center font-display font-bold text-2xl mx-auto mb-4">A</div>
          <h1 className="font-display text-3xl text-charcoal">Create Account</h1>
          <p className="font-body text-sm text-gray-500 mt-2">Join ABD Wears for exclusive access</p>
        </div>
        <div className="bg-white p-8 shadow-sm">
          <form onSubmit={handle} className="space-y-5">
            {[
              { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Ahmed Ali' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'you@email.com' },
            ].map(field => (
              <div key={field.key}>
                <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">{field.label}</label>
                <input type={field.type} value={form[field.key]} onChange={e => set(field.key, e.target.value)}
                  placeholder={field.placeholder} className={`input-field ${errors[field.key] ? 'border-red-400' : ''}`} />
                {errors[field.key] && <p className="text-red-500 text-xs mt-1">{errors[field.key]}</p>}
              </div>
            ))}
            <div>
              <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)}
                  placeholder="Min 6 characters" className={`input-field pr-12 ${errors.password ? 'border-red-400' : ''}`} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">Confirm Password</label>
              <input type="password" value={form.confirm} onChange={e => set('confirm', e.target.value)}
                placeholder="Repeat password" className={`input-field ${errors.confirm ? 'border-red-400' : ''}`} />
              {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
            </div>
            <button type="submit" disabled={loading} className="btn-gold w-full text-center">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="font-body text-sm text-center text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-gold hover:text-gold-dark font-medium transition-colors">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// ==================== ACCOUNT ====================
export function Account() {
  const { user, logout, getUserOrders } = useStore();
  const navigate = useNavigate();
  const orders = getUserOrders();

  if (!user) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <p className="font-display text-2xl mb-4">Please login to view your account</p>
      <Link to="/login" className="btn-gold">Login</Link>
    </div>
  );

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
      <div className="mb-8">
        <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase mb-2">My Profile</p>
        <h1 className="font-display text-4xl text-charcoal">My Account</h1>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 text-center">
            <div className="w-16 h-16 bg-charcoal text-cream flex items-center justify-center font-display text-2xl mx-auto mb-4">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3 className="font-display text-xl text-charcoal">{user.name}</h3>
            <p className="font-body text-sm text-gray-500 mt-1">{user.email}</p>
            <div className="mt-6 space-y-2">
              <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-sm font-body text-charcoal hover:bg-cream transition-colors w-full text-left">
                <Package size={16} className="text-gold" /> My Orders ({orders.length})
              </Link>
              <Link to="/wishlist" className="flex items-center gap-3 px-4 py-3 text-sm font-body text-charcoal hover:bg-cream transition-colors w-full text-left">
                <Heart size={16} className="text-gold" /> Wishlist
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-sm font-body text-red-500 hover:bg-red-50 transition-colors w-full text-left">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
        {/* Recent Orders */}
        <div className="md:col-span-2">
          <div className="bg-white p-6">
            <h3 className="font-display text-xl text-charcoal mb-6">Recent Orders</h3>
            {orders.length === 0 ? (
              <div className="text-center py-10">
                <Package size={40} className="text-gray-200 mx-auto mb-3" />
                <p className="font-body text-sm text-gray-500">No orders yet</p>
                <Link to="/shop" className="btn-gold mt-4 inline-block">Start Shopping</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 5).map(order => (
                  <div key={order.id} className="border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-gold tracking-wider">{order.id}</span>
                      <span className={`font-mono text-xs px-2 py-1 ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>{order.status}</span>
                    </div>
                    <p className="font-body text-sm text-gray-500">{new Date(order.date).toLocaleDateString('en-PK')}</p>
                    <p className="font-display text-base mt-1">₨{order.total.toLocaleString()}</p>
                    <p className="font-body text-xs text-gray-400">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                  </div>
                ))}
                <Link to="/orders" className="font-body text-sm text-gold hover:text-gold-dark transition-colors">View all orders →</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== ORDERS ====================
export function Orders() {
  const { user, getUserOrders } = useStore();
  const orders = getUserOrders();

  if (!user) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <p className="font-display text-2xl mb-4">Please login to view orders</p>
      <Link to="/login" className="btn-gold">Login</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
      <div className="mb-8">
        <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase mb-2">Purchase History</p>
        <h1 className="font-display text-4xl text-charcoal">My Orders</h1>
        <p className="font-body text-sm text-gray-500 mt-1">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
      </div>
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package size={64} className="text-gray-200 mx-auto mb-6" />
          <p className="font-display text-2xl text-charcoal mb-2">No orders yet</p>
          <Link to="/shop" className="btn-gold">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white border border-gray-100">
              {/* Order Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-sm text-gold tracking-wider">{order.id}</span>
                  <p className="font-body text-xs text-gray-400 mt-0.5">{new Date(order.date).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-display text-lg">₨{order.total.toLocaleString()}</span>
                  <span className={`font-mono text-xs px-3 py-1 ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'Processing' ? 'bg-purple-100 text-purple-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{order.status}</span>
                </div>
              </div>
              {/* Items */}
              <div className="px-6 py-4 space-y-3">
                {order.items.map(item => (
                  <div key={item.key} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-14 h-16 object-cover bg-gray-50 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="font-mono text-xs text-gray-400">{item.size} • {item.color} • Qty: {item.qty}</p>
                    </div>
                    <span className="font-body text-sm font-semibold">₨{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              {/* Delivery Info */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                <p className="font-body text-xs text-gray-500">
                  📦 {order.customer.address}, {order.customer.city} • 💵 {order.customer.payment?.toUpperCase() || 'COD'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
