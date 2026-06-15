import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal, cartCount } = useStore();

  if (cart.length === 0) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <ShoppingBag size={64} className="text-gray-200 mb-6" />
      <h2 className="font-display text-3xl text-charcoal mb-3">Your cart is empty</h2>
      <p className="font-body text-gray-500 mb-8">Add some items to get started</p>
      <Link to="/shop" className="btn-gold">Continue Shopping</Link>
    </div>
  );

  const shipping = cartTotal >= 5000 ? 0 : 250;
  const grandTotal = cartTotal + shipping;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <div className="mb-8">
        <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase mb-2">ABD Wears</p>
        <h1 className="font-display text-4xl text-charcoal">Shopping Cart</h1>
        <p className="font-body text-sm text-gray-500 mt-1">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 font-mono text-xs tracking-widest text-gray-400 uppercase pb-3 border-b border-gray-200">
            <span className="col-span-6">Product</span>
            <span className="col-span-2 text-center">Price</span>
            <span className="col-span-2 text-center">Qty</span>
            <span className="col-span-2 text-right">Total</span>
          </div>

          {cart.map(item => (
            <div key={item.key} className="grid md:grid-cols-12 gap-4 items-center py-4 border-b border-gray-100">
              {/* Product info */}
              <div className="md:col-span-6 flex gap-4">
                <Link to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-gray-50 shrink-0" />
                </Link>
                <div className="flex flex-col justify-center min-w-0">
                  <p className="font-mono text-[10px] text-gold tracking-wider uppercase">{item.category}</p>
                  <Link to={`/product/${item.id}`} className="font-display text-base hover:text-gold transition-colors line-clamp-2">
                    {item.name}
                  </Link>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {item.size && <span className="font-mono text-[10px] border border-gray-200 px-2 py-0.5 text-gray-500">Size: {item.size}</span>}
                    {item.color && <span className="font-mono text-[10px] border border-gray-200 px-2 py-0.5 text-gray-500">{item.color}</span>}
                  </div>
                  {/* Mobile price */}
                  <span className="md:hidden font-display text-sm mt-2">₨{item.price.toLocaleString()}</span>
                </div>
              </div>

              {/* Price */}
              <div className="hidden md:flex md:col-span-2 justify-center">
                <span className="font-display text-base">₨{item.price.toLocaleString()}</span>
              </div>

              {/* Qty */}
              <div className="md:col-span-2 flex items-center gap-1 md:justify-center">
                <button onClick={() => updateQty(item.key, item.qty - 1)} className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:border-charcoal transition-colors">
                  <Minus size={12} />
                </button>
                <span className="w-8 text-center font-mono text-sm">{item.qty}</span>
                <button onClick={() => updateQty(item.key, item.qty + 1)} className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:border-charcoal transition-colors">
                  <Plus size={12} />
                </button>
                <button onClick={() => removeFromCart(item.key)} className="ml-2 text-gray-300 hover:text-red-500 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Total */}
              <div className="hidden md:flex md:col-span-2 justify-end">
                <span className="font-display text-base font-semibold">₨{(item.price * item.qty).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 sticky top-24">
            <h3 className="font-display text-xl text-charcoal mb-6">Order Summary</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between font-body text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>₨{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-gray-500">Shipping</span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-medium">FREE</span>
                ) : (
                  <span>₨{shipping.toLocaleString()}</span>
                )}
              </div>
              {shipping > 0 && (
                <p className="font-mono text-[10px] text-gold tracking-wide">
                  Add ₨{(5000 - cartTotal).toLocaleString()} more for free delivery
                </p>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-display text-base">Total</span>
                <span className="font-display text-xl text-charcoal">₨{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <Link to="/checkout" className="btn-gold w-full flex items-center justify-center gap-2 text-center">
              Proceed to Checkout <ArrowRight size={16} />
            </Link>

            <Link to="/shop" className="btn-outline w-full flex items-center justify-center gap-2 mt-3 text-center">
              Continue Shopping
            </Link>

            {/* Payment methods */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="font-mono text-[10px] text-gray-400 tracking-wider uppercase mb-3">We Accept</p>
              <div className="flex gap-2 flex-wrap">
                {['JazzCash', 'EasyPaisa', 'COD', 'Bank Transfer'].map(m => (
                  <span key={m} className="font-mono text-[9px] border border-gray-200 px-2 py-1 text-gray-500">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
