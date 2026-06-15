import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/store';

export default function Navbar() {
  const { cartCount, wishlist, user, logout } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [userMenu, setUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenu(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQ.trim()) { navigate(`/shop?q=${encodeURIComponent(searchQ.trim())}`); setSearchOpen(false); setSearchQ(''); }
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-charcoal text-cream text-xs font-mono tracking-widest py-2 text-center hidden md:block">
        FREE DELIVERY ON ORDERS OVER ₨5,000 &nbsp;•&nbsp; NATIONWIDE SHIPPING &nbsp;•&nbsp; COD AVAILABLE
      </div>

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cream/95 backdrop-blur shadow-md' : 'bg-cream'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-charcoal text-cream flex items-center justify-center font-display font-bold text-lg group-hover:bg-gold transition-colors duration-300">
                A
              </div>
              <div>
                <div className="font-display font-bold text-xl text-charcoal leading-none">ABD Wears</div>
                <div className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase">2026 Collection</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="font-body text-sm font-medium text-charcoal hover:text-gold transition-colors">Home</Link>
              <div className="relative group">
                <button className="font-body text-sm font-medium text-charcoal hover:text-gold transition-colors flex items-center gap-1">
                  Shop <ChevronDown size={14} />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link to="/shop" className="block px-4 py-3 text-sm font-body hover:bg-cream hover:text-gold transition-colors border-b border-gray-100">All Products</Link>
                  {CATEGORIES.map(cat => (
                    <Link key={cat.id} to={`/shop?category=${cat.id}`} className="block px-4 py-3 text-sm font-body hover:bg-cream hover:text-gold transition-colors">
                      {cat.icon} {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/shop?badge=New Arrival" className="font-body text-sm font-medium text-charcoal hover:text-gold transition-colors">New In</Link>
              <Link to="/shop?category=sale" className="font-body text-sm font-medium text-red-600 hover:text-red-800 transition-colors font-semibold">Sale 🔥</Link>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-1 md:gap-3">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:text-gold transition-colors">
                <Search size={20} />
              </button>

              <Link to="/wishlist" className="p-2 hover:text-gold transition-colors relative">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="p-2 hover:text-gold transition-colors relative">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-charcoal text-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User */}
              <div className="relative">
                <button onClick={() => setUserMenu(!userMenu)} className="p-2 hover:text-gold transition-colors flex items-center gap-1">
                  <User size={20} />
                  {user && <span className="hidden md:block text-xs font-body">{user.name.split(' ')[0]}</span>}
                </button>
                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 w-44 bg-white shadow-xl z-50">
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-xs font-mono text-gray-500">Logged in as</p>
                          <p className="text-sm font-body font-medium truncate">{user.name}</p>
                        </div>
                        <Link to="/account" className="block px-4 py-3 text-sm font-body hover:bg-cream transition-colors">My Account</Link>
                        <Link to="/orders" className="block px-4 py-3 text-sm font-body hover:bg-cream transition-colors">My Orders</Link>
                        <button onClick={logout} className="block w-full text-left px-4 py-3 text-sm font-body text-red-600 hover:bg-red-50 transition-colors">
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="block px-4 py-3 text-sm font-body hover:bg-cream transition-colors">Login</Link>
                        <Link to="/register" className="block px-4 py-3 text-sm font-body hover:bg-cream transition-colors">Register</Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="pb-4 animate-fade-in">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  autoFocus
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  placeholder="Search for products..."
                  className="input-field flex-1"
                />
                <button type="submit" className="btn-gold px-4 py-3">Search</button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 animate-slide-in">
            <Link to="/" className="block py-3 font-body text-sm font-medium border-b border-gray-100">Home</Link>
            <Link to="/shop" className="block py-3 font-body text-sm font-medium border-b border-gray-100">All Products</Link>
            {CATEGORIES.map(cat => (
              <Link key={cat.id} to={`/shop?category=${cat.id}`} className="block py-2 font-body text-sm pl-4 text-gray-600 border-b border-gray-50">
                {cat.icon} {cat.name}
              </Link>
            ))}
            <Link to="/wishlist" className="block py-3 font-body text-sm font-medium border-b border-gray-100">Wishlist ({wishlist.length})</Link>
            {user ? (
              <>
                <Link to="/account" className="block py-3 font-body text-sm font-medium border-b border-gray-100">My Account</Link>
                <Link to="/orders" className="block py-3 font-body text-sm font-medium border-b border-gray-100">My Orders</Link>
                <button onClick={logout} className="block w-full text-left py-3 font-body text-sm font-medium text-red-600">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-3 font-body text-sm font-medium border-b border-gray-100">Login</Link>
                <Link to="/register" className="block py-3 font-body text-sm font-medium">Register</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
