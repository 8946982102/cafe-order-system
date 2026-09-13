import React from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Home, UtensilsCrossed, Info, Compass, ShoppingBag } from 'lucide-react';

export const MobileQuickBar: React.FC = () => {
  const { activePage, setActivePage, cart, setIsCartOpen } = useApp();

  const totalCartItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, ariaLabel: 'Go to Home page' },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed, ariaLabel: 'Go to Menu page' },
    { id: 'track', label: 'Track', icon: Compass, ariaLabel: 'Track active order' },
    { id: 'about', label: 'About', icon: Info, ariaLabel: 'About Us and Cafe Location' },
  ];

  return (
    <nav 
      role="navigation"
      aria-label="Mobile quick actions"
      className="fixed bottom-3 left-3 right-3 z-30 md:hidden pointer-events-none"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-2 pointer-events-auto bg-[#120B07]/92 backdrop-blur-xl border border-white/10 px-3 py-2 rounded-2xl shadow-2xl">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 flex-1 justify-around" role="tablist">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isActive}
                aria-label={item.ariaLabel}
                onClick={() => {
                  setActivePage(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isActive
                    ? 'text-white'
                    : 'text-[#A8988C] hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'scale-110 text-amber-300' : 'text-[#A8988C]'}`} aria-hidden="true" />
                <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-bold text-white' : 'font-medium'}`}>
                  {item.label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-dot"
                    className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-amber-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Floating Cart Trigger Pill */}
        <button
          id="mobile-quick-cart-btn"
          onClick={() => setIsCartOpen(true)}
          aria-label={`Open order tray, ${totalCartItems} items`}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all shadow-md cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
            totalCartItems > 0 
              ? 'bg-[#8B1E1E] text-white border-red-400/50' 
              : 'bg-[#1C120B] text-[#D6C7B8] border-white/10'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-amber-200" aria-hidden="true" />
            <AnimatePresence>
              {totalCartItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-black text-white text-[9px] font-extrabold flex items-center justify-center border border-amber-300/40"
                  aria-hidden="true"
                >
                  {totalCartItems}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <span className="text-[11px] font-bold tracking-tight">
            {totalCartItems > 0 ? 'Tray' : 'Cart'}
          </span>
        </button>

      </div>
    </nav>
  );
};
