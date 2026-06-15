import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingBag, Tag, LogOut,
  Plus, Edit2, Trash2, Search, X, Check, ChevronDown,
  TrendingUp, Users, DollarSign, AlertCircle, Menu, Save
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/store';

// ==================== ADMIN LAYOUT ====================
function AdminLayout({ children, title }) {
  const { adminAuth, adminLogout, orders, products } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!adminAuth) navigate('/admin/login');
  }, [adminAuth]);

  if (!adminAuth) return null;

  const handleLogout = () => { adminLogout(); navigate('/admin/login'); };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/admin/products', label: 'Products', icon: <Package size={18} />, badge: products.length },
    { path: '/admin/orders', label: 'Orders', icon: <ShoppingBag size={18} />, badge: orders.filter(o => o.status === 'Pending').length },
    { path: '/admin/categories', label: 'Categories', icon: <Tag size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-60 bg-charcoal z-50 flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold flex items-center justify-center font-display font-bold text-white">A</div>
            <div>
              <p className="font-display text-base text-cream leading-none">ABD Wears</p>
              <p className="font-mono text-[9px] text-gold tracking-widest">ADMIN PANEL</p>
            </div>
          </div>
        </div>
        {/* Nav */}
        <nav className="flex-1 py-6 space-y-1 px-3">
          {navItems.map(item => (
            <Link key={item.path} to={item.path}
              className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}>
              {item.icon}
              <span>{item.label}</span>
              {item.badge > 0 && (
                <span className={`ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full ${location.pathname === item.path ? 'bg-white/20 text-white' : 'bg-gold text-white'}`}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
        {/* Bottom */}
        <div className="px-3 py-6 border-t border-white/10 space-y-2">
          <Link to="/" target="_blank" className="admin-nav-item text-gray-400 hover:text-white hover:bg-white/10">
            <Package size={16} /> View Store
          </Link>
          <button onClick={handleLogout} className="admin-nav-item w-full text-red-400 hover:bg-red-500/10 hover:text-red-300">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-500">
              <Menu size={22} />
            </button>
            <h1 className="font-display text-xl text-charcoal">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-gray-400 hidden md:block">admin@abdwears.pk</span>
            <div className="w-8 h-8 bg-charcoal text-cream flex items-center justify-center font-display text-sm">A</div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMobileOpen(false)} />}
    </div>
  );
}

// ==================== ADMIN LOGIN ====================
export function AdminLogin() {
  const { adminAuth, adminLogin } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (adminAuth) navigate('/admin'); }, [adminAuth]);

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const ok = adminLogin(form.username, form.password);
    setLoading(false);
    if (ok) navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-gold flex items-center justify-center font-display font-bold text-2xl text-white mx-auto mb-4">A</div>
          <h1 className="font-display text-3xl text-cream">Admin Panel</h1>
          <p className="font-mono text-xs text-gold tracking-widest mt-2 uppercase">ABD Wears — 2026</p>
        </div>
        <div className="bg-white p-8">
          <form onSubmit={handle} className="space-y-5">
            <div>
              <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">Username</label>
              <input value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                placeholder="admin" required className="input-field" />
            </div>
            <div>
              <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">Password</label>
              <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••" required className="input-field" />
            </div>
            <button type="submit" disabled={loading} className="btn-gold w-full text-center">
              {loading ? 'Signing in...' : 'Access Admin Panel'}
            </button>
          </form>
          <p className="font-mono text-xs text-gray-400 text-center mt-6">Default: admin / abdwears2026</p>
        </div>
        <p className="text-center mt-6">
          <Link to="/" className="font-body text-sm text-cream/50 hover:text-gold transition-colors">← Back to Store</Link>
        </p>
      </div>
    </div>
  );
}

// ==================== DASHBOARD ====================
export function AdminDashboard() {
  const { products, orders } = useStore();
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const lowStock = products.filter(p => p.stock < 10).length;

  const stats = [
    { label: 'Total Revenue', value: `₨${totalRevenue.toLocaleString()}`, icon: <DollarSign size={22} />, color: 'bg-green-50 text-green-600', trend: '+12%' },
    { label: 'Total Orders', value: orders.length, icon: <ShoppingBag size={22} />, color: 'bg-blue-50 text-blue-600', trend: `${pendingOrders} pending` },
    { label: 'Products', value: products.length, icon: <Package size={22} />, color: 'bg-purple-50 text-purple-600', trend: `${lowStock} low stock` },
    { label: 'Customers', value: [...new Set(orders.map(o => o.userId))].length, icon: <Users size={22} />, color: 'bg-gold/10 text-gold', trend: 'registered' },
  ];

  const recentOrders = orders.slice(0, 8);

  return (
    <AdminLayout title="Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-none border border-gray-100">
            <div className={`w-10 h-10 ${s.color} flex items-center justify-center mb-4`}>{s.icon}</div>
            <p className="font-display text-2xl text-charcoal">{s.value}</p>
            <p className="font-body text-xs text-gray-500 mt-1">{s.label}</p>
            <p className="font-mono text-[10px] text-gold tracking-wide mt-1">{s.trend}</p>
          </div>
        ))}
      </div>

      {/* Low Stock Alert */}
      {lowStock > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-4 mb-6 flex items-center gap-3">
          <AlertCircle size={18} className="text-amber-600 shrink-0" />
          <p className="font-body text-sm text-amber-800">
            {lowStock} product{lowStock > 1 ? 's' : ''} running low on stock.{' '}
            <Link to="/admin/products" className="underline font-medium">Manage inventory →</Link>
          </p>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-display text-lg text-charcoal">Recent Orders</h3>
          <Link to="/admin/orders" className="font-body text-sm text-gold hover:text-gold-dark transition-colors">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                {['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Date'].map(h => (
                  <th key={h} className="px-6 py-3 text-left font-mono text-[10px] tracking-widest text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center font-body text-sm text-gray-400">No orders yet</td></tr>
              ) : recentOrders.map(order => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gold">{order.id}</td>
                  <td className="px-6 py-4 font-body text-sm">{order.customer?.name || 'Guest'}</td>
                  <td className="px-6 py-4 font-body text-sm text-gray-500">{order.items.length}</td>
                  <td className="px-6 py-4 font-display text-sm">₨{order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`font-mono text-[10px] px-2 py-1 ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Processing' ? 'bg-purple-100 text-purple-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-4 font-body text-xs text-gray-400">{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

// ==================== PRODUCTS ====================
const EMPTY_PRODUCT = {
  name: '', category: 'men', price: '', originalPrice: '',
  image: '', description: '', sizes: [], colors: [], stock: '',
  badge: '', featured: false,
};

export function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [sizeInput, setSizeInput] = useState('');
  const [colorInput, setColorInput] = useState('');

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.includes(search.toLowerCase())
  );

  const openAdd = () => { setEditing(null); setForm(EMPTY_PRODUCT); setSizeInput(''); setColorInput(''); setModal(true); };
  const openEdit = (p) => {
    setEditing(p.id);
    setForm({ ...p, price: String(p.price), originalPrice: String(p.originalPrice), stock: String(p.stock) });
    setSizeInput(''); setColorInput('');
    setModal(true);
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addSize = () => { if (sizeInput.trim() && !form.sizes.includes(sizeInput.trim())) { set('sizes', [...form.sizes, sizeInput.trim()]); setSizeInput(''); } };
  const removeSize = (s) => set('sizes', form.sizes.filter(x => x !== s));
  const addColor = () => { if (colorInput.trim() && !form.colors.includes(colorInput.trim())) { set('colors', [...form.colors, colorInput.trim()]); setColorInput(''); } };
  const removeColor = (c) => set('colors', form.colors.filter(x => x !== c));

  const handleSave = () => {
    const data = { ...form, price: +form.price, originalPrice: +form.originalPrice || +form.price, stock: +form.stock };
    if (editing) updateProduct(editing, data);
    else addProduct(data);
    setModal(false);
  };

  const handleDelete = (id) => { if (confirm('Delete this product?')) deleteProduct(id); };

  return (
    <AdminLayout title="Products">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
            className="input-field pl-9 text-sm" />
        </div>
        <button onClick={openAdd} className="btn-gold flex items-center gap-2 text-sm">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['Product', 'Category', 'Price', 'Stock', 'Badge', 'Featured', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-mono text-[10px] tracking-widest text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-12 object-cover bg-gray-100 shrink-0" />
                      <span className="font-body text-sm font-medium line-clamp-1 max-w-[150px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gold capitalize">{p.category}</td>
                  <td className="px-4 py-3 font-display text-sm">₨{p.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`font-mono text-xs px-2 py-1 ${p.stock < 10 ? 'bg-red-100 text-red-600' : p.stock < 30 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-body text-xs text-gray-500">{p.badge || '—'}</td>
                  <td className="px-4 py-3">
                    {p.featured ? <Check size={16} className="text-green-500" /> : <X size={16} className="text-gray-200" />}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-gold transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 font-body text-sm text-gray-400">No products found</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="font-display text-xl text-charcoal">{editing ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-charcoal"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">Product Name *</label>
                <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Silk Flow Maxi Dress" className="input-field" />
              </div>
              {/* Category */}
              <div>
                <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">Category *</label>
                <select value={form.category} onChange={e => set('category', e.target.value)} className="input-field">
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              {/* Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">Sale Price (₨) *</label>
                  <input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="5500" className="input-field" />
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">Original Price (₨)</label>
                  <input type="number" value={form.originalPrice} onChange={e => set('originalPrice', e.target.value)} placeholder="7000" className="input-field" />
                </div>
              </div>
              {/* Stock */}
              <div>
                <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">Stock Quantity *</label>
                <input type="number" value={form.stock} onChange={e => set('stock', e.target.value)} placeholder="50" className="input-field" />
              </div>
              {/* Image */}
              <div>
                <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">Image URL *</label>
                <input value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://..." className="input-field" />
                {form.image && <img src={form.image} alt="Preview" className="w-20 h-24 object-cover mt-2 border border-gray-100" />}
              </div>
              {/* Description */}
              <div>
                <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">Description</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} className="input-field resize-none" />
              </div>
              {/* Sizes */}
              <div>
                <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">Sizes</label>
                <div className="flex gap-2 flex-wrap mb-2">
                  {form.sizes.map(s => (
                    <span key={s} className="flex items-center gap-1 border border-gray-200 px-2 py-1 font-mono text-xs">
                      {s} <button onClick={() => removeSize(s)} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={sizeInput} onChange={e => setSizeInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addSize()}
                    placeholder="e.g. M or 32" className="input-field flex-1 text-sm" />
                  <button onClick={addSize} className="btn-outline px-4 py-2 text-sm">Add</button>
                </div>
              </div>
              {/* Colors */}
              <div>
                <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">Colors</label>
                <div className="flex gap-2 flex-wrap mb-2">
                  {form.colors.map(c => (
                    <span key={c} className="flex items-center gap-1 border border-gray-200 px-2 py-1 font-mono text-xs">
                      {c} <button onClick={() => removeColor(c)} className="text-red-400 hover:text-red-600"><X size={10} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={colorInput} onChange={e => setColorInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addColor()}
                    placeholder="e.g. Black" className="input-field flex-1 text-sm" />
                  <button onClick={addColor} className="btn-outline px-4 py-2 text-sm">Add</button>
                </div>
              </div>
              {/* Badge & Featured */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">Badge</label>
                  <select value={form.badge || ''} onChange={e => set('badge', e.target.value || null)} className="input-field">
                    <option value="">None</option>
                    <option value="New Arrival">New Arrival</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="Sale">Sale</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest text-charcoal uppercase block mb-2">Featured</label>
                  <label className="flex items-center gap-3 mt-3 cursor-pointer">
                    <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="w-4 h-4 accent-gold" />
                    <span className="font-body text-sm">Show on Homepage</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 sticky bottom-0 bg-white">
              <button onClick={() => setModal(false)} className="btn-outline flex-1">Cancel</button>
              <button onClick={handleSave} className="btn-gold flex-1 flex items-center justify-center gap-2">
                <Save size={16} /> {editing ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

// ==================== ORDERS ====================
const STATUS_OPTIONS = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export function AdminOrders() {
  const { orders, updateOrderStatus } = useStore();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = orders.filter(o =>
    (filter === 'All' || o.status === filter) &&
    (o.id.includes(search) || o.customer?.name?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AdminLayout title="Orders">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders..." className="input-field pl-9 text-sm" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', ...STATUS_OPTIONS].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase border transition-colors ${filter === s ? 'bg-charcoal text-cream border-charcoal' : 'border-gray-200 hover:border-charcoal text-gray-600'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['Order', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Date'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-mono text-[10px] tracking-widest text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center font-body text-sm text-gray-400">No orders found</td></tr>
              ) : filtered.map(order => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gold">{order.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-body text-sm font-medium">{order.customer?.name || 'Guest'}</p>
                    <p className="font-body text-xs text-gray-400">{order.customer?.phone || ''}</p>
                    <p className="font-body text-xs text-gray-400">{order.customer?.city || ''}</p>
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-gray-600">{order.items.length}</td>
                  <td className="px-4 py-3 font-display text-sm">₨{order.total.toLocaleString()}</td>
                  <td className="px-4 py-3 font-body text-xs text-gray-500 uppercase">{order.customer?.payment || 'COD'}</td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={e => updateOrderStatus(order.id, e.target.value)}
                      className={`font-mono text-[10px] px-2 py-1 border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'Processing' ? 'bg-purple-100 text-purple-700' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 font-body text-xs text-gray-400">{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

// ==================== CATEGORIES ====================
export function AdminCategories() {
  const { products } = useStore();

  return (
    <AdminLayout title="Categories">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map(cat => {
          const count = products.filter(p => p.category === cat.id || (cat.id === 'sale' && p.badge === 'Sale')).length;
          return (
            <div key={cat.id} className="bg-white border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{cat.icon}</span>
                <span className="font-mono text-xs bg-gold/10 text-gold px-3 py-1">{count} items</span>
              </div>
              <h3 className="font-display text-xl text-charcoal mb-1">{cat.name}</h3>
              <p className="font-mono text-xs text-gray-400 tracking-wider">/{cat.id}</p>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link to={`/shop?category=${cat.id}`} target="_blank"
                  className="font-body text-xs text-gold hover:text-gold-dark transition-colors">View in Store →</Link>
                <Link to="/admin/products" className="font-body text-xs text-gray-400 hover:text-charcoal transition-colors">Manage Products</Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-4 bg-gold/10 border border-gold/30">
        <p className="font-body text-sm text-charcoal">
          💡 To add new categories, update <code className="font-mono text-xs bg-gold/20 px-1">src/data/store.js</code> — CATEGORIES array.
        </p>
      </div>
    </AdminLayout>
  );
}
