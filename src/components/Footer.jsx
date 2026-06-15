import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { STORE_INFO, CATEGORIES } from '../data/store';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl mb-1">Stay in the Loop</h3>
            <p className="font-body text-sm text-cream/60">Get 10% off your first order. New arrivals, exclusive deals.</p>
          </div>
          <form className="flex gap-0 w-full md:w-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 md:w-72 px-4 py-3 bg-white/10 border border-white/20 text-cream placeholder-cream/40 font-body text-sm focus:outline-none focus:border-gold transition-colors"
            />
            <button className="bg-gold hover:bg-gold-dark text-white px-6 py-3 font-body text-sm font-medium tracking-wider uppercase transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-gold flex items-center justify-center font-display font-bold text-lg text-white">A</div>
            <div>
              <div className="font-display font-bold text-xl text-cream leading-none">ABD Wears</div>
              <div className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase">2026 Collection</div>
            </div>
          </div>
          <p className="font-body text-sm text-cream/60 leading-relaxed mb-6">
            Premium fashion for the modern Pakistani. Curated styles, unmatched quality, nationwide delivery.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
              <Facebook size={16} />
            </a>
            <a href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
              <Twitter size={16} />
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-mono text-xs tracking-widest text-gold uppercase mb-6">Shop</h4>
          <ul className="space-y-3">
            {CATEGORIES.map(cat => (
              <li key={cat.id}>
                <Link to={`/shop?category=${cat.id}`} className="font-body text-sm text-cream/70 hover:text-gold transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/shop?badge=New Arrival" className="font-body text-sm text-cream/70 hover:text-gold transition-colors">New Arrivals</Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-mono text-xs tracking-widest text-gold uppercase mb-6">Help</h4>
          <ul className="space-y-3">
            {['Size Guide', 'Shipping Policy', 'Return Policy', 'Track Order', 'FAQ', 'Contact Us'].map(item => (
              <li key={item}>
                <a href="#" className="font-body text-sm text-cream/70 hover:text-gold transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-mono text-xs tracking-widest text-gold uppercase mb-6">Contact</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone size={14} className="text-gold mt-0.5 shrink-0" />
              <span className="font-body text-sm text-cream/70">{STORE_INFO.phone}</span>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={14} className="text-gold mt-0.5 shrink-0" />
              <span className="font-body text-sm text-cream/70">{STORE_INFO.email}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
              <span className="font-body text-sm text-cream/70">{STORE_INFO.address}</span>
            </div>
          </div>
          <div className="mt-6 p-4 border border-white/10 bg-white/5">
            <p className="font-mono text-xs text-gold tracking-wider mb-1">BUSINESS HOURS</p>
            <p className="font-body text-sm text-cream/70">Mon – Sat: 10am – 8pm</p>
            <p className="font-body text-sm text-cream/70">Sunday: 12pm – 6pm</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-cream/40">© 2026 ABD Wears. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="font-mono text-xs text-cream/40 hover:text-gold cursor-pointer transition-colors">Privacy Policy</span>
            <span className="font-mono text-xs text-cream/40 hover:text-gold cursor-pointer transition-colors">Terms of Service</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-cream/40">Payments:</span>
            {['JazzCash', 'EasyPaisa', 'COD'].map(m => (
              <span key={m} className="font-mono text-[10px] border border-white/20 px-2 py-0.5 text-cream/60">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
