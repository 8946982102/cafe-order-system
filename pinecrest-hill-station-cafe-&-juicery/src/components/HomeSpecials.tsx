import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { HILL_STATION_TESTIMONIALS } from '../data/initialProducts';
import { Sparkles, ArrowRight, Star } from 'lucide-react';

export const HomeSpecials: React.FC = () => {
  const { products, setActivePage } = useApp();

  const signatureProducts = products.filter((p) => p.isChefSpecial).slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-16 py-6 sm:py-8 bg-[#0D0805] text-[#FAF5EF]">
      
      {/* Signature Mountain Recommendations Section */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C120B] border border-[#2E1A11] text-xs font-bold text-[#E6B87D] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Today's Highlights</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FAF5EF] tracking-tight">
              Chef's Special Recommendations
            </h2>
            <p className="text-xs sm:text-sm text-[#A8988C] mt-1 max-w-xl">
              Freshly pressed orchard juices, signature roasted coffees, and oven-warm morning croissants.
            </p>
          </div>

          <button
            onClick={() => {
              setActivePage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C120B] hover:bg-[#26180F] text-[#FAF5EF] border border-[#2E1A11] text-xs font-bold transition-all cursor-pointer"
          >
            <span>View All 18 Items</span>
            <ArrowRight className="w-4 h-4 text-[#E6B87D]" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {signatureProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Hill Station Atmosphere Showcase */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-[#140D09] rounded-2xl sm:rounded-3xl border border-[#2E1A11] p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E6B87D]">
                Pure Atmosphere & Fresh Flavors
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FAF5EF] leading-tight">
                Crafted Daily with Orchard Purity & Warmth
              </h2>
              <p className="text-xs sm:text-sm text-[#B3A294] leading-relaxed">
                Nestled on the ridge line above the mist, Pinecrest offers pure orchard apples cold-pressed every morning, single-origin mountain espresso, and hearth-fired French pastries.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-xl bg-[#1C120B] border border-[#2E1A11]">
                  <p className="text-2xl font-extrabold text-[#E6B87D]">100%</p>
                  <p className="text-xs font-bold text-[#FAF5EF] mt-0.5">Cold-Pressed</p>
                  <p className="text-[11px] text-[#A8988C]">Zero preservatives or artificial sugar</p>
                </div>

                <div className="p-4 rounded-xl bg-[#1C120B] border border-[#2E1A11]">
                  <p className="text-2xl font-extrabold text-[#E6B87D]">6,800'</p>
                  <p className="text-xs font-bold text-[#FAF5EF] mt-0.5">Alpine Roast</p>
                  <p className="text-[11px] text-[#A8988C]">Freshly brewed Arabica beans</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#8B1E1E] hover:bg-[#A32323] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm border border-[#A63232]/50 cursor-pointer"
                >
                  <span>Our Mountain Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scenic Food & Cafe Photos */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden h-40 sm:h-48 border border-[#2E1A11]">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
                  alt="Specialty coffee"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl sm:rounded-2xl overflow-hidden h-40 sm:h-48 border border-[#2E1A11]">
                <img
                  src="https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80"
                  alt="Fresh cold pressed juices"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl sm:rounded-2xl overflow-hidden h-40 sm:h-48 border border-[#2E1A11]">
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
                  alt="Freshly baked croissants"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl sm:rounded-2xl overflow-hidden h-40 sm:h-48 border border-[#2E1A11]">
                <img
                  src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
                  alt="Himalayan spiced tea"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Real Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E6B87D]">
            Customer Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAF5EF]">
            Loved by Travelers & Locals
          </h2>
          <p className="text-xs sm:text-sm text-[#A8988C]">
            Real feedback from guests enjoying our fresh brews and orchard cold-presses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {HILL_STATION_TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-[#140D09] border border-[#2E1A11] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center text-amber-400 gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#D6C7B8] leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#26160E]">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#422517]"
                />
                <div>
                  <h4 className="font-bold text-xs text-[#FAF5EF]">{t.name}</h4>
                  <p className="text-[10px] text-[#A8988C]">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clean Bottom Order CTA Card */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-[#140D09] text-[#FAF5EF] rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden border border-[#2E1A11] shadow-xl">
          <div className="max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAF5EF]">
              Ready to Order Delicious Food & Drinks?
            </h2>
            <p className="text-xs sm:text-sm text-[#A8988C]">
              Fast and simple online ordering with live status tracking.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActivePage('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3 rounded-xl bg-[#8B1E1E] hover:bg-[#A32323] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md inline-flex items-center gap-2 border border-[#A63232]/50 cursor-pointer"
              >
                <span>Browse Menu & Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
