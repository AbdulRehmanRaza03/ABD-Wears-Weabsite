import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/store';
import ProductCard from '../components/ProductCard';

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Top Rated' },
];

export default function Shop() {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categoryParam = searchParams.get('category') || '';
  const badgeParam = searchParams.get('badge') || '';
  const qParam = searchParams.get('q') || '';

  const setCategory = (cat) => {
    const p = new URLSearchParams(searchParams);
    if (cat) p.set('category', cat); else p.delete('category');
    p.delete('badge'); p.delete('q');
    setSearchParams(p);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (categoryParam === 'sale') { list = list.filter(p => p.badge === 'Sale'); }
    else if (categoryParam) { list = list.filter(p => p.category === categoryParam); }
    if (badgeParam) list = list.filter(p => p.badge === badgeParam);
    if (qParam) list = list.filter(p => p.name.toLowerCase().includes(qParam.toLowerCase()) || p.category.toLowerCase().includes(qParam.toLowerCase()));
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sort) {
      case 'price-asc': return list.sort((a, b) => a.price - b.price);
      case 'price-desc': return list.sort((a, b) => b.price - a.price);
      case 'rating': return list.sort((a, b) => b.rating - a.rating);
      case 'newest': return list.sort((a, b) => b.id - a.id);
      default: return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [products, categoryParam, badgeParam, qParam, sort, priceRange]);

  const activeTitle = categoryParam === 'sale' ? '🔥 Sale'
    : badgeParam ? badgeParam
    : qParam ? `Search: "${qParam}"`
    : categoryParam ? CATEGORIES.find(c => c.id === categoryParam)?.name || 'Shop'
    : 'All Products';

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase mb-2">ABD Wears</p>
        <h1 className="font-display text-4xl text-charcoal">{activeTitle}</h1>
        <p className="font-body text-sm text-gray-500 mt-1">{filtered.length} products</p>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button onClick={() => setCategory('')}
          className={`px-4 py-2 text-xs font-mono tracking-wider uppercase border transition-colors ${!categoryParam && !badgeParam && !qParam ? 'bg-charcoal text-cream border-charcoal' : 'border-gray-300 hover:border-charcoal'}`}>
          All
        </button>
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 text-xs font-mono tracking-wider uppercase border transition-colors ${categoryParam === cat.id ? 'bg-charcoal text-cream border-charcoal' : 'border-gray-300 hover:border-charcoal'}`}>
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters — desktop */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 space-y-8">
            {/* Price Range */}
            <div>
              <h3 className="font-mono text-xs tracking-widest text-charcoal uppercase mb-4">Price Range</h3>
              <div className="space-y-3">
                <input type="range" min={0} max={20000} step={500}
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                  className="w-full accent-gold"
                />
                <div className="flex justify-between font-mono text-xs text-gray-500">
                  <span>₨0</span>
                  <span>₨{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-mono text-xs tracking-widest text-charcoal uppercase mb-4">Sort By</h3>
              <div className="space-y-1">
                {SORT_OPTIONS.map(o => (
                  <button key={o.value} onClick={() => setSort(o.value)}
                    className={`w-full text-left px-3 py-2 font-body text-sm transition-colors ${sort === o.value ? 'bg-gold/10 text-gold font-medium' : 'hover:bg-gray-50'}`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear */}
            {(categoryParam || badgeParam || qParam) && (
              <button onClick={() => { setSearchParams({}); }}
                className="flex items-center gap-2 text-xs font-mono text-red-500 hover:text-red-700 transition-colors">
                <X size={12} /> Clear Filters
              </button>
            )}
          </div>
        </aside>

        {/* Mobile filter bar */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <button onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 border border-gray-300 px-4 py-2 text-sm font-body">
              <SlidersHorizontal size={14} /> Filters
            </button>
            <div className="relative">
              <select value={sort} onChange={e => setSort(e.target.value)}
                className="appearance-none border border-gray-300 px-4 py-2 pr-8 text-sm font-body bg-white">
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>
          </div>

          {/* Mobile filters panel */}
          {filtersOpen && (
            <div className="mb-6 p-4 bg-white border border-gray-200 space-y-4 lg:hidden">
              <div>
                <h3 className="font-mono text-xs tracking-widest text-charcoal uppercase mb-3">Price Range</h3>
                <input type="range" min={0} max={20000} step={500}
                  value={priceRange[1]} onChange={e => setPriceRange([0, +e.target.value])}
                  className="w-full accent-gold" />
                <div className="flex justify-between font-mono text-xs text-gray-500 mt-1">
                  <span>₨0</span><span>₨{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-charcoal mb-2">No products found</p>
              <p className="font-body text-sm text-gray-500 mb-6">Try adjusting your filters</p>
              <button onClick={() => { setSearchParams({}); setPriceRange([0, 20000]); }}
                className="btn-outline">Clear All Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
