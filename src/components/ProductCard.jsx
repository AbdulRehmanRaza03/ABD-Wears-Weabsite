import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product, className = '' }) {
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0] || 'One Size', product.colors[0] || 'Default');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className={`product-card ${className}`}>
      {/* Image container */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badge && (
            <span className={`badge text-white text-[10px] ${
              product.badge === 'Sale' ? 'bg-red-600' :
              product.badge === 'Bestseller' ? 'bg-gold' :
              'bg-charcoal'
            }`}>
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="badge bg-red-600 text-white text-[10px]">-{discount}%</span>
          )}
        </div>

        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="font-mono text-xs tracking-widest text-charcoal uppercase">Out of Stock</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleWishlist}
            className={`w-9 h-9 flex items-center justify-center shadow-md transition-colors ${
              wishlisted ? 'bg-gold text-white' : 'bg-white text-charcoal hover:bg-gold hover:text-white'
            }`}
          >
            <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
          <Link
            to={`/product/${product.id}`}
            className="w-9 h-9 bg-white text-charcoal flex items-center justify-center shadow-md hover:bg-gold hover:text-white transition-colors"
          >
            <Eye size={15} />
          </Link>
        </div>

        {/* Quick add — bottom slide up */}
        {product.stock > 0 && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleQuickAdd}
              className="w-full bg-charcoal text-cream text-xs font-mono tracking-widest uppercase py-3 hover:bg-gold transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={14} /> Quick Add
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <p className="font-mono text-[10px] tracking-widest text-gold uppercase mb-1">
            {product.category}
          </p>
          <h3 className="font-display text-base text-charcoal leading-tight hover:text-gold transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={11} className={i <= Math.round(product.rating) ? 'text-gold fill-gold' : 'text-gray-200 fill-gray-200'} />
              ))}
            </div>
            <span className="font-mono text-[10px] text-gray-400">({product.reviews})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-display text-lg text-charcoal font-semibold">
            ₨{product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <span className="font-body text-sm text-gray-400 line-through">
              ₨{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
