import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Coffee, 
  Mountain, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Check
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, settings } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-[#0A0604] text-[#A8988C] pt-16 pb-12 border-t border-[#26150C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          
          {/* Brand & Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#991B1B] to-[#B91C1C] flex items-center justify-center text-white shadow-md border border-red-400/30">
                <Coffee className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <span className="font-serif-display text-2xl font-bold text-[#FAF5EF] block leading-none">
                  Pinecrest
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#E6B87D] font-semibold">
                  Hill Station Café & Juicery
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A8988C] leading-relaxed">
              Perched at 6,800 feet along the scenic misty pine ridge. Dedicated to artisanal manual brewing, orchard-fresh cold-presses, and honest mountain hospitality.
            </p>

            <div className="text-xs text-[#E6B87D] font-semibold flex items-center gap-1.5 pt-0.5">
              <Mountain className="w-4 h-4 text-[#E6B87D]" /> High Altitude Valley Estate • 6,800 Ft
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif-display text-lg font-bold text-[#FAF5EF] tracking-wide">
              Explore & Enjoy
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8988C]">
              <li>
                <button
                  onClick={() => {
                    setActivePage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E6B87D] transition-colors"
                >
                  Mountain Home & Specials
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E6B87D] transition-colors"
                >
                  Artisanal Juices & Brews Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('track');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E6B87D] transition-colors"
                >
                  Live Real-Time Order Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E6B87D] transition-colors"
                >
                  Mountain Estate & Heritage Story
                </button>
              </li>
            </ul>
          </div>

          {/* Visiting & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif-display text-lg font-bold text-[#FAF5EF] tracking-wide">
              Estate Hours & Location
            </h4>
            <div className="space-y-2.5 text-xs text-[#A8988C]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#E6B87D] shrink-0 mt-0.5" />
                <span>{settings.openingHours}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E6B87D] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#E6B87D] shrink-0 mt-0.5" />
                <span>{settings.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#E6B87D] shrink-0 mt-0.5" />
                <span>{settings.email}</span>
              </div>
            </div>
          </div>

          {/* Harvest & Roaster Dispatch */}
          <div className="space-y-3">
            <h4 className="font-serif-display text-lg font-bold text-[#FAF5EF] tracking-wide">
              Fresh Harvest Dispatch
            </h4>
            <p className="text-xs text-[#A8988C]">
              Receive notification when our seasonal orchard apple press or rare high-grown lots arrive.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#140D09] border border-[#2B170E] text-xs text-[#FAF5EF] placeholder-[#7A6B5F] focus:ring-1 focus:ring-[#991B1B] focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-[#991B1B] hover:bg-[#7F1D1D] text-white flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {newsletterSubscribed && (
                <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Thank you! You're subscribed to Mountain Dispatches.
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar with Owner Portal entrance */}
        <div className="pt-6 border-t border-[#26150C] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6B5F]">
          <p>
            © {new Date().getFullYear()} {settings.cafeName}. All rights reserved. Crafted for hill travelers & coffee lovers.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setActivePage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#FAF5EF] transition-colors"
            >
              Topography & Map
            </button>
            <span className="text-[#3A2215]">•</span>
            <button
              onClick={() => {
                setActivePage('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#FAF5EF] transition-colors"
            >
              Cold-Press Bar
            </button>
            <span className="text-[#3A2215]">•</span>
            
            {/* Owner & Barista Entrance */}
            <button
              id="footer-owner-portal-btn"
              onClick={() => {
                setActivePage('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#E6B87D] hover:text-white flex items-center gap-1.5 font-semibold transition-colors px-2.5 py-1 rounded-lg bg-[#140D09] border border-[#2B170E]"
              title="Restricted to Cafe Owner & Barista Staff"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#E6B87D]" />
              <span>Owner & Staff Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
