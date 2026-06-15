import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Truck, RefreshCw, Shield, Headphones, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/store';
import ProductCard from '../components/ProductCard';

const HERO_SLIDES = [
  {
    id: 1,
    label: 'New Collection 2026',
    title: 'Redefine\nYour Style',
    subtitle: 'Elevated Pakistani fashion for the modern era. Crafted with intention, worn with confidence.',
    cta: 'Shop Women',
    ctaLink: '/shop?category=women',
    bg: 'from-[#1a1a1a] to-[#2d2010]',
    accent: '#c9a96e',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: 2,
    label: 'Men\'s Summer Edit',
    title: 'Sharp.\nCool.\nDistinctive.',
    subtitle: 'Summer 2026 menswear — linen, cotton, and crafted details for the Pakistani climate.',
    cta: 'Shop Men',
    ctaLink: '/shop?category=men',
    bg: 'from-[#0d1a0d] to-[#1a2d1a]',
    accent: '#8fa68e',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
  },
  {
    id: 3,
    label: 'Accessories Drop',
    title: 'The Details\nMatter Most',
    subtitle: 'Bags, scarves, and statement pieces that complete every look in the 2026 collection.',
    cta: 'Shop Accessories',
    ctaLink: '/shop?category=accessories',
    bg: 'from-[#1a0d0d] to-[#2d1a1a]',
    accent: '#e8c5b0',
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
  },
];

export default function Home() {
  const { products } = useStore();
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();

  const featured = products.filter(p => p.featured).slice(0, 8);
  const newArrivals = products.filter(p => p.badge === 'New Arrival').slice(0, 4);
  const onSale = products.filter(p => p.badge === 'Sale').slice(0, 4);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const current = HERO_SLIDES[slide];

  return (
    <div>
      {/* HERO */}
      <section className={`relative min-h-[90vh] bg-gradient-to-br ${current.bg} overflow-hidden grain transition-all duration-700`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 min-h-[90vh] flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full py-16">
            {/* Text */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-px" style={{ background: current.accent }} />
                <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: current.accent }}>
                  {current.label}
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl text-white leading-[1.05] mb-6 whitespace-pre-line">
                {current.title}
              </h1>
              <p className="font-body text-base text-white/60 leading-relaxed max-w-md mb-8">
                {current.subtitle}
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link to={current.ctaLink} className="btn-gold">
                  {current.cta} <ArrowRight size={16} className="inline ml-2" />
                </Link>
                <Link to="/shop" className="border border-white/30 text-white/80 hover:bg-white/10 font-body text-sm px-6 py-3 transition-all duration-300 tracking-wider uppercase">
                  Browse All
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative hidden md:block">
              <div className="relative w-full aspect-[3/4] max-w-md ml-auto overflow-hidden">
                <img
                  src={current.img}
                  alt="Fashion"
                  className="w-full h-full object-cover object-top"
                  key={current.id}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 border" style={{ borderColor: current.accent + '30' }} />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 border" style={{ borderColor: current.accent + '30' }} />
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button onClick={() => setSlide(s => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)} className="p-1 text-white/50 hover:text-white">
            <ChevronLeft size={20} />
          </button>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`w-6 h-0.5 transition-all duration-300 ${i === slide ? 'bg-gold w-10' : 'bg-white/30'}`}
            />
          ))}
          <button onClick={() => setSlide(s => (s + 1) % HERO_SLIDES.length)} className="p-1 text-white/50 hover:text-white">
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Truck size={20} />, title: 'Free Delivery', sub: 'Orders over ₨5,000' },
            { icon: <RefreshCw size={20} />, title: 'Easy Returns', sub: '7-day return policy' },
            { icon: <Shield size={20} />, title: 'Secure Payment', sub: 'JazzCash, EasyPaisa, COD' },
            { icon: <Headphones size={20} />, title: '24/7 Support', sub: 'WhatsApp & call' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="text-gold shrink-0">{item.icon}</div>
              <div>
                <p className="font-body text-sm font-medium text-cream">{item.title}</p>
                <p className="font-mono text-[10px] text-cream/40 tracking-wide">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase mb-3">Browse by Category</p>
          <h2 className="section-title">Shop the Collection</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} to={`/shop?category=${cat.id}`}
              className="group relative overflow-hidden bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square flex flex-col items-center justify-center p-6 gap-3">
                <span className="text-4xl">{cat.icon}</span>
                <span className="font-display text-lg text-charcoal group-hover:text-gold transition-colors">{cat.name}</span>
                <div className="w-0 h-0.5 bg-gold group-hover:w-8 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase mb-2">Handpicked for You</p>
              <h2 className="section-title">Featured Products</h2>
            </div>
            <Link to="/shop" className="btn-outline hidden md:inline-block">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/shop" className="btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Split Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 grid md:grid-cols-2 gap-4">
        <div className="relative overflow-hidden bg-charcoal group cursor-pointer" onClick={() => navigate('/shop?badge=New Arrival')}>
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
            alt="New Arrivals" className="w-full h-72 object-cover opacity-50 group-hover:opacity-40 transition-opacity group-hover:scale-105 duration-500" />
          <div className="absolute inset-0 flex flex-col justify-center px-10">
            <span className="font-mono text-xs text-gold tracking-widest uppercase mb-3">Just Landed</span>
            <h3 className="font-display text-3xl text-cream mb-4">New Arrivals</h3>
            <span className="inline-flex items-center gap-2 text-cream/80 font-body text-sm group-hover:text-gold transition-colors">
              Shop Now <ArrowRight size={16} />
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gold group cursor-pointer" onClick={() => navigate('/shop?category=sale')}>
          <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80"
            alt="Sale" className="w-full h-72 object-cover opacity-40 group-hover:opacity-30 transition-opacity group-hover:scale-105 duration-500" />
          <div className="absolute inset-0 flex flex-col justify-center px-10">
            <span className="font-mono text-xs text-white/80 tracking-widest uppercase mb-3">Limited Time</span>
            <h3 className="font-display text-3xl text-white mb-1">Up to 30% Off</h3>
            <p className="font-body text-sm text-white/70 mb-4">On selected items</p>
            <span className="inline-flex items-center gap-2 text-white font-body text-sm group-hover:gap-4 transition-all">
              Grab the Deal <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </section>

      {/* New Arrivals & Sale */}
      <section className="py-16 px-4 md:px-6 bg-cream/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* New Arrivals */}
            <div>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase mb-1">Fresh Stock</p>
                  <h3 className="font-display text-2xl text-charcoal">New Arrivals</h3>
                </div>
                <Link to="/shop?badge=New Arrival" className="font-body text-sm text-gold hover:text-gold-dark flex items-center gap-1">
                  See all <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-4">
                {newArrivals.map(p => (
                  <Link key={p.id} to={`/product/${p.id}`} className="flex gap-4 bg-white p-3 group hover:shadow-md transition-shadow">
                    <img src={p.image} alt={p.name} className="w-20 h-24 object-cover shrink-0" />
                    <div className="flex flex-col justify-center">
                      <span className="font-mono text-[10px] text-gold tracking-widest uppercase">{p.category}</span>
                      <h4 className="font-display text-base group-hover:text-gold transition-colors">{p.name}</h4>
                      <span className="font-body text-sm font-semibold mt-1">₨{p.price.toLocaleString()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* On Sale */}
            <div>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="font-mono text-xs tracking-[0.3em] text-red-500 uppercase mb-1">Limited Time</p>
                  <h3 className="font-display text-2xl text-charcoal">On Sale 🔥</h3>
                </div>
                <Link to="/shop?category=sale" className="font-body text-sm text-gold hover:text-gold-dark flex items-center gap-1">
                  See all <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-4">
                {onSale.map(p => (
                  <Link key={p.id} to={`/product/${p.id}`} className="flex gap-4 bg-white p-3 group hover:shadow-md transition-shadow">
                    <img src={p.image} alt={p.name} className="w-20 h-24 object-cover shrink-0" />
                    <div className="flex flex-col justify-center">
                      <span className="font-mono text-[10px] text-red-500 tracking-widest uppercase">SALE</span>
                      <h4 className="font-display text-base group-hover:text-gold transition-colors">{p.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-body text-sm font-semibold text-red-600">₨{p.price.toLocaleString()}</span>
                        <span className="font-body text-xs text-gray-400 line-through">₨{p.originalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-charcoal px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase mb-3">What Customers Say</p>
          <h2 className="section-title text-cream mb-12">Loved Across Pakistan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Fatima A.', city: 'Lahore', text: 'Absolutely love the quality! The Silk Maxi arrived perfectly packed. Will definitely order again.', rating: 5 },
              { name: 'Hassan R.', city: 'Karachi', text: 'Kurta set is amazing — fabric is premium, stitching is perfect. Delivery was super fast!', rating: 5 },
              { name: 'Ayesha M.', city: 'Islamabad', text: 'Best online fashion store in Pakistan. Genuine products, great customer service.', rating: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 text-left">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} className="text-gold fill-gold" />)}
                </div>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="font-display text-sm text-cream">{t.name}</p>
                  <p className="font-mono text-[10px] text-gold tracking-wider">{t.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
