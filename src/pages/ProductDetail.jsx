import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Truck, RefreshCw, Shield, ChevronRight, Minus, Plus } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart, toggleWishlist, isWishlisted } = useStore();
  const navigate = useNavigate();

  const product = products.find(p => p.id === +id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState('description');
  const [sizeError, setSizeError] = useState(false);

  if (!product) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <p className="font-display text-2xl mb-4">Product not found</p>
      <Link to="/shop" className="btn-gold">Back to Shop</Link>
    </div>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : null;
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    addToCart(product, selectedSize, selectedColor || product.colors[0], qty);
  };

  const handleBuyNow = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    addToCart(product, selectedSize, selectedColor || product.colors[0], qty);
    navigate('/cart');
  };

  const images = product.images || [product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-mono text-xs text-gray-400 mb-8">
        <Link to="/" className="hover:text-gold transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
        <ChevronRight size={12} />
        <Link to={`/shop?category=${product.category}`} className="hover:text-gold capitalize transition-colors">{product.category}</Link>
        <ChevronRight size={12} />
        <span className="text-charcoal truncate max-w-[150px]">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-16">
        {/* Images */}
        <div className="space-y-3">
          <div className="aspect-[4/5] overflow-hidden bg-gray-50">
            <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-16 h-20 overflow-hidden border-2 transition-colors ${activeImg === i ? 'border-gold' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {/* Badges */}
          <div className="flex gap-2 mb-3">
            {product.badge && (
              <span className={`badge text-white text-xs ${product.badge === 'Sale' ? 'bg-red-600' : product.badge === 'Bestseller' ? 'bg-gold' : 'bg-charcoal'}`}>
                {product.badge}
              </span>
            )}
            {discount && <span className="badge bg-red-100 text-red-700 text-xs">Save {discount}%</span>}
          </div>

          <p className="font-mono text-xs tracking-widest text-gold uppercase mb-2">{product.category}</p>
          <h1 className="font-display text-3xl md:text-4xl text-charcoal mb-3">{product.name}</h1>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={14} className={i <= Math.round(product.rating) ? 'text-gold fill-gold' : 'text-gray-200 fill-gray-200'} />
                ))}
              </div>
              <span className="font-body text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-display text-4xl text-charcoal">₨{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="font-body text-xl text-gray-400 line-through">₨{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mb-5">
              <p className="font-mono text-xs tracking-widest text-charcoal uppercase mb-3">
                Color: <span className="text-gold">{selectedColor || 'Select'}</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map(color => (
                  <button key={color} onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-xs font-body border transition-colors ${selectedColor === color ? 'border-gold bg-gold/5 text-gold' : 'border-gray-200 hover:border-gray-400'}`}>
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className={`font-mono text-xs tracking-widest uppercase ${sizeError ? 'text-red-500' : 'text-charcoal'}`}>
                Size: {sizeError ? <span className="text-red-500">Please select a size</span> : <span className="text-gold">{selectedSize || 'Select'}</span>}
              </p>
              <button className="font-body text-xs text-gold underline">Size Guide</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map(size => (
                <button key={size} onClick={() => { setSelectedSize(size); setSizeError(false); }}
                  className={`min-w-[44px] h-11 px-3 text-sm font-mono border transition-all ${
                    selectedSize === size ? 'border-charcoal bg-charcoal text-cream' : 'border-gray-200 hover:border-charcoal'
                  }`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div className="flex items-center gap-4 mb-6">
            <p className="font-mono text-xs tracking-widest text-charcoal uppercase">Qty:</p>
            <div className="flex items-center border border-gray-200">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Minus size={14} />
              </button>
              <span className="w-12 text-center font-mono text-sm">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Plus size={14} />
              </button>
            </div>
            <span className="font-body text-xs text-gray-400">{product.stock} in stock</span>
          </div>

          {/* CTAs */}
          <div className="flex gap-3 mb-6">
            <button onClick={handleAddToCart} className="flex-1 btn-outline flex items-center justify-center gap-2">
              <ShoppingBag size={16} /> Add to Cart
            </button>
            <button onClick={handleBuyNow} className="flex-1 btn-gold flex items-center justify-center gap-2">
              Buy Now
            </button>
            <button onClick={() => toggleWishlist(product)}
              className={`w-12 h-12 border flex items-center justify-center transition-colors ${wishlisted ? 'border-gold bg-gold/5 text-gold' : 'border-gray-200 hover:border-gold hover:text-gold'}`}>
              <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Trust */}
          <div className="space-y-3 border-t border-gray-100 pt-6">
            {[
              { icon: <Truck size={14} />, text: 'Free delivery on orders over ₨5,000' },
              { icon: <RefreshCw size={14} />, text: '7-day easy returns & exchanges' },
              { icon: <Shield size={14} />, text: 'Secure payment — JazzCash, EasyPaisa, COD' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 font-body text-sm text-gray-600">
                <span className="text-gold">{item.icon}</span> {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="flex border-b border-gray-200 mb-6">
          {['description', 'details', 'reviews'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-6 py-3 font-mono text-xs tracking-widest uppercase transition-colors ${tab === t ? 'border-b-2 border-charcoal text-charcoal' : 'text-gray-400 hover:text-charcoal'}`}>
              {t}
            </button>
          ))}
        </div>
        {tab === 'description' && (
          <p className="font-body text-base text-gray-600 leading-relaxed max-w-2xl">{product.description}</p>
        )}
        {tab === 'details' && (
          <div className="grid md:grid-cols-2 gap-4 max-w-xl">
            {[
              ['Category', product.category],
              ['Available Sizes', product.sizes.join(', ')],
              ['Colors', product.colors.join(', ')],
              ['Stock', `${product.stock} units`],
              ['SKU', `ABD-${product.id}-2026`],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-4 border-b border-gray-100 pb-3">
                <span className="font-mono text-xs tracking-wider text-gray-400 uppercase w-32 shrink-0">{k}</span>
                <span className="font-body text-sm text-charcoal capitalize">{v}</span>
              </div>
            ))}
          </div>
        )}
        {tab === 'reviews' && (
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6 p-4 bg-gold/5 border border-gold/20">
              <div className="text-center">
                <p className="font-display text-5xl text-charcoal">{product.rating}</p>
                <div className="flex gap-0.5 justify-center my-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} className={i <= Math.round(product.rating) ? 'text-gold fill-gold' : 'text-gray-200 fill-gray-200'} />)}
                </div>
                <p className="font-mono text-xs text-gray-500">{product.reviews} reviews</p>
              </div>
            </div>
            <p className="font-body text-sm text-gray-500 italic">Detailed reviews coming soon. Be the first to review this product!</p>
          </div>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <div className="mb-8">
            <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase mb-2">You May Also Like</p>
            <h2 className="section-title">Related Products</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
