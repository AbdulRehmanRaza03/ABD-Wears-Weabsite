import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Other'];

export default function Checkout() {
  const { cart, cartTotal, placeOrder, user } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=info, 2=payment, 3=confirm
  const [placed, setPlaced] = useState(null);

  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '',
    phone: '', address: '', city: 'Lahore', notes: '',
    payment: 'cod',
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate1 = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim() || form.phone.length < 10) e.phone = 'Valid phone number required';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city) e.city = 'City is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate1()) setStep(2); };

  const handlePlaceOrder = () => {
    const order = placeOrder(form);
    setPlaced(order);
    setStep(3);
  };

  if (cart.length === 0 && !placed) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <p className="font-display text-2xl mb-4">Your cart is empty</p>
      <Link to="/shop" className="btn-gold">Shop Now</Link>
    </div>
  );

  const shipping = cartTotal >= 5000 ? 0 : 250;
  const grandTotal = cartTotal + shipping;

  // ORDER PLACED SUCCESS
  if (step === 3 && placed) return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={44} className="text-green-500" />
        </div>
        <h2 className="font-display text-3xl text-charcoal mb-3">Order Placed!</h2>
        <p className="font-body text-gray-500 mb-2">Thank you, <strong>{form.name}</strong>!</p>
        <div className="bg-gold/10 border border-gold/30 px-6 py-3 inline-block mb-6">
          <span className="font-mono text-sm text-gold tracking-widest">Order ID: {placed.id}</span>
        </div>
        <div className="bg-white p-6 text-left mb-8 space-y-3">
          <p className="font-mono text-xs tracking-widest text-gray-400 uppercase mb-4">Order Summary</p>
          {placed.items.map(item => (
            <div key={item.key} className="flex justify-between font-body text-sm">
              <span className="text-gray-600">{item.name} × {item.qty}</span>
              <span>₨{(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t border-gray-100 pt-3 flex justify-between font-display text-base">
            <span>Total Paid</span>
            <span>₨{placed.total.toLocaleString()}</span>
          </div>
          <div className="pt-2 font-body text-xs text-gray-500">
            <p>📦 Delivering to: {form.address}, {form.city}</p>
            <p>💳 Payment: {form.payment === 'cod' ? 'Cash on Delivery' : form.payment}</p>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <Link to="/orders" className="btn-outline">Track Order</Link>
          <Link to="/" className="btn-gold">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <div className="mb-8">
        <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase mb-2">ABD Wears</p>
        <h1 className="font-display text-4xl text-charcoal">Checkout</h1>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-10">
        {['Delivery Info', 'Payment', 'Confirm'].map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 font-mono text-xs tracking-wider uppercase ${step === i + 1 ? 'text-charcoal' : step > i + 1 ? 'text-gold' : 'text-gray-300'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${step === i + 1 ? 'border-charcoal bg-charcoal text-cream' : step > i + 1 ? 'border-gold bg-gold text-white' : 'border-gray-200 text-gray-300'}`}>
                {step > i + 1 ? '✓' : i + 1}
              </span>
              <span className="hidden md:inline">{s}</span>
            </div>
            {i < 2 && <div className={`flex-1 h-px ${step > i + 1 ? 'bg-gold' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="font-display text-xl text-charcoal mb-6">Delivery Information</h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-mono text-xs tracking-wider text-charcoal uppercase block mb-2">Full Name *</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)}
                    placeholder="Ahmed Ali" className={`input-field ${errors.name ? 'border-red-400' : ''}`} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="font-mono text-xs tracking-wider text-charcoal uppercase block mb-2">Phone Number *</label>
                  <input value={form.phone} onChange={e => set('phone', e.target.value)}
                    placeholder="03XX XXXXXXX" className={`input-field ${errors.phone ? 'border-red-400' : ''}`} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <label className="font-mono text-xs tracking-wider text-charcoal uppercase block mb-2">Email (optional)</label>
                <input value={form.email} onChange={e => set('email', e.target.value)}
                  type="email" placeholder="you@email.com" className="input-field" />
              </div>
              <div>
                <label className="font-mono text-xs tracking-wider text-charcoal uppercase block mb-2">City *</label>
                <select value={form.city} onChange={e => set('city', e.target.value)}
                  className={`input-field ${errors.city ? 'border-red-400' : ''}`}>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="font-mono text-xs tracking-wider text-charcoal uppercase block mb-2">Full Address *</label>
                <textarea value={form.address} onChange={e => set('address', e.target.value)}
                  placeholder="House No, Street, Area..." rows={3}
                  className={`input-field resize-none ${errors.address ? 'border-red-400' : ''}`} />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              <div>
                <label className="font-mono text-xs tracking-wider text-charcoal uppercase block mb-2">Order Notes (optional)</label>
                <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                  placeholder="Any special instructions..." rows={2}
                  className="input-field resize-none" />
              </div>
              <button onClick={handleNext} className="btn-gold flex items-center gap-2">
                Continue to Payment <ChevronRight size={16} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-display text-xl text-charcoal mb-6">Payment Method</h3>
              <div className="space-y-3">
                {[
                  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: '💵' },
                  { id: 'jazzcash', label: 'JazzCash', desc: 'Mobile wallet payment', icon: '📱' },
                  { id: 'easypaisa', label: 'EasyPaisa', desc: 'Mobile wallet payment', icon: '📱' },
                  { id: 'bank', label: 'Bank Transfer', desc: 'Direct bank transfer', icon: '🏦' },
                ].map(opt => (
                  <label key={opt.id} className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${form.payment === opt.id ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" value={opt.id}
                      checked={form.payment === opt.id}
                      onChange={e => set('payment', e.target.value)}
                      className="accent-gold" />
                    <span className="text-xl">{opt.icon}</span>
                    <div>
                      <p className="font-body font-medium text-sm">{opt.label}</p>
                      <p className="font-body text-xs text-gray-500">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              {(form.payment === 'jazzcash' || form.payment === 'easypaisa') && (
                <div className="mt-4 p-4 bg-gold/10 border border-gold/30">
                  <p className="font-body text-sm text-charcoal">
                    Send payment to: <strong>03XX-XXXXXXX</strong><br />
                    Account Name: <strong>ABD Wears</strong><br />
                    Include your name in the transaction description.
                  </p>
                </div>
              )}
              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(1)} className="btn-outline">← Back</button>
                <button onClick={() => setStep(3)} className="btn-gold flex items-center gap-2">
                  Review Order <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-display text-xl text-charcoal mb-6">Review & Confirm</h3>
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-white border border-gray-100">
                  <p className="font-mono text-xs tracking-widest text-gray-400 uppercase mb-3">Delivery To</p>
                  <p className="font-body font-medium">{form.name}</p>
                  <p className="font-body text-sm text-gray-600">{form.phone}</p>
                  <p className="font-body text-sm text-gray-600">{form.address}, {form.city}</p>
                  <button onClick={() => setStep(1)} className="font-body text-xs text-gold mt-2 hover:underline">Edit</button>
                </div>
                <div className="p-4 bg-white border border-gray-100">
                  <p className="font-mono text-xs tracking-widest text-gray-400 uppercase mb-3">Payment</p>
                  <p className="font-body text-sm font-medium">
                    {form.payment === 'cod' ? '💵 Cash on Delivery' : form.payment === 'jazzcash' ? '📱 JazzCash' : form.payment === 'easypaisa' ? '📱 EasyPaisa' : '🏦 Bank Transfer'}
                  </p>
                  <button onClick={() => setStep(2)} className="font-body text-xs text-gold mt-2 hover:underline">Edit</button>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn-outline">← Back</button>
                <button onClick={handlePlaceOrder} className="btn-gold flex items-center gap-2 flex-1 justify-center">
                  ✓ Place Order — ₨{grandTotal.toLocaleString()}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white p-6 sticky top-24">
            <h3 className="font-display text-lg text-charcoal mb-4">Your Order</h3>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cart.map(item => (
                <div key={item.key} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-16 object-cover bg-gray-50 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs font-medium line-clamp-2">{item.name}</p>
                    <p className="font-mono text-[10px] text-gray-400">{item.size} • Qty {item.qty}</p>
                    <p className="font-body text-sm font-semibold">₨{(item.price * item.qty).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between font-body text-sm"><span className="text-gray-500">Subtotal</span><span>₨{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between font-body text-sm"><span className="text-gray-500">Shipping</span><span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : `₨${shipping}`}</span></div>
              <div className="flex justify-between font-display text-base pt-2 border-t border-gray-100"><span>Total</span><span>₨{grandTotal.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
