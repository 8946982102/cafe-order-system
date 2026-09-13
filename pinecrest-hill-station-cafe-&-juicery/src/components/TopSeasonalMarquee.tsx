import React from 'react';
import { Sparkles, ArrowRight, Flame, Apple, Coffee } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

interface SpecialItem {
  id: string;
  tag: string;
  badgeColor: string;
  title: string;
  detail: string;
  timeRemaining: string;
}

const SEASONAL_SPECIALS: SpecialItem[] = [
  {
    id: 'spec-1',
    tag: 'ORCHARD HARVEST',
    badgeColor: 'bg-[#991B1B] text-white',
    title: 'Autumn Honeycrisp & Wild Mint Press',
    detail: 'Cold-pressed at 6,800 ft with fresh orchard apples',
    timeRemaining: 'Fresh Today'
  },
  {
    id: 'spec-2',
    tag: 'SINGLE ORIGIN',
    badgeColor: 'bg-[#8C5E35] text-white',
    title: 'Himalayan Peaberry V60 Micro-Lot',
    detail: 'Notes of roasted hazelnut, mountain wildflower & dark cocoa',
    timeRemaining: 'Limited Brews'
  },
  {
    id: 'spec-3',
    tag: 'WOOD-FIRED HEARTH',
    badgeColor: 'bg-[#78350F] text-white',
    title: 'Spiced Apple & Walnut Brioche',
    detail: 'Stone-baked fresh every morning at 7:30 AM',
    timeRemaining: 'Batch #2 Ready'
  },
  {
    id: 'spec-4',
    tag: 'MOUNTAIN ELIXIR',
    badgeColor: 'bg-[#831843] text-white',
    title: 'Rhododendron Blossom Sparkling Tonic',
    detail: 'Infused with high-altitude wild petals and citrus bitters',
    timeRemaining: '35 Bottles Left'
  }
];

export const TopSeasonalMarquee: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <div className="w-full bg-[#180F0A] text-[#F3ECE2] border-b border-[#332014] overflow-hidden relative z-50 select-none shadow-md">
      <div className="flex items-center">
        
        {/* Left Fixed Badge on Desktop */}
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#8C5E35] text-white text-[11px] font-bold tracking-widest uppercase shrink-0 shadow-xs z-10">
          <Sparkles className="w-3.5 h-3.5 text-[#FEE2E2] animate-pulse" />
          <span>Limited Season Specials</span>
        </div>

        {/* Smooth Scrolling Marquee Strip */}
        <div className="flex-1 overflow-hidden py-2 sm:py-2.5 relative flex items-center">
          <motion.div
            className="flex items-center gap-8 sm:gap-12 whitespace-nowrap will-change-transform"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {/* Duplicate array for seamless infinite looping */}
            {[...SEASONAL_SPECIALS, ...SEASONAL_SPECIALS].map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`}
                onClick={() => {
                  setActivePage('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 cursor-pointer group hover:opacity-90 transition-opacity"
              >
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${item.badgeColor}`}>
                  {item.tag}
                </span>

                <span className="text-xs font-semibold text-[#FAF7F2] group-hover:text-[#E6B87D] transition-colors">
                  {item.title}
                </span>

                <span className="hidden md:inline text-xs text-[#BFB09F] font-normal">
                  — {item.detail}
                </span>

                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#D97706] font-semibold">
                  <Flame className="w-3 h-3 text-[#DC2626]" />
                  {item.timeRemaining}
                </span>

                <span className="text-[#6B5A4B] text-xs px-2">•</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Action Button */}
        <div className="shrink-0 px-3 sm:px-4 py-1.5 z-10">
          <button
            onClick={() => {
              setActivePage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#FAF7F2]/10 hover:bg-[#8C5E35] text-white text-[11px] font-bold tracking-wide transition-all border border-white/20 hover:border-[#8C5E35] flex items-center gap-1.5 active:scale-95 shadow-2xs"
          >
            <span className="hidden sm:inline">Explore Menu</span>
            <span className="sm:hidden">Menu</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};
