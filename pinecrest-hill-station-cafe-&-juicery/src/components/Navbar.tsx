import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  User as UserIcon, 
  LogOut, 
  ShieldCheck, 
  Menu as MenuIcon, 
  X, 
  Coffee, 
  Search
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    cartCount, 
    setIsCartOpen, 
    currentUser, 
    isAdmin, 
    logout, 
    setIsAuthModalOpen 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Clean, intuitive main navigation tabs (About Us page clearly included)
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'track', label: 'Track Order' },
    { id: 'about', label: 'About Us' },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      role="banner"
      className="sticky top-3 sm:top-4 z-40 w-full px-3 sm:px-6 lg:px-8 transition-all"
    >
      {/* 
        Redesigned Navbar:
        - Rounded corners (rounded-2xl sm:rounded-full)
        - Semi-transparent, dark-themed background (bg-[#120B07]/80 backdrop-blur-xl border border-white/10)
        - Prominent, polished logo
        - Intuitively grouped menu items without clutter
        - Fully keyboard & screen-reader accessible with ARIA
      */}
      <div className="max-w-7xl mx-auto bg-[#120B07]/80 backdrop-blur-xl rounded-2xl sm:rounded-full border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.65)] px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        
        {/* Prominent Logo & Cafe Brand */}
        <button 
          id="nav-brand-logo"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-full"
          aria-label="Pinecrest Cafe and Juicery Home"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#A62626] to-[#6E1414] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(166,38,38,0.45),inset_0_1px_0_rgba(255,255,255,0.3)] border border-amber-400/30 transition-transform group-hover:scale-105">
            <Coffee className="w-5 h-5 text-amber-200" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-xl font-black tracking-tight text-white group-hover:text-[#E6B87D] transition-colors">
                Pinecrest
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 hidden sm:inline-block" aria-hidden="true" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#B3A294] block">
              Cafe & Juicery
            </span>
          </div>
        </button>

        {/* Intuitively Grouped Center Navigation */}
        <nav 
          role="navigation" 
          aria-label="Main navigation menu"
          className="hidden md:flex items-center gap-1 bg-[#1A100A]/90 p-1.5 rounded-full border border-white/5 shadow-inner"
        >
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isActive
                    ? 'bg-[#8B1E1E] text-white shadow-[0_2px_8px_rgba(139,30,30,0.5),inset_0_1px_0_rgba(255,255,255,0.25)] border border-red-400/40'
                    : 'text-[#D6C7B8] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Search, Order Tray, Admin & Sign In */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Quick Menu Search */}
          <button
            id="nav-quick-menu-btn"
            onClick={() => handleNavClick('menu')}
            aria-label="Search and browse menu items"
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-[#D6C7B8] hover:text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Search className="w-3.5 h-3.5 text-[#E6B87D]" aria-hidden="true" />
            <span>Search</span>
          </button>

          {/* Prominent Order Tray Button */}
          <button
            id="nav-cart-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open Order Tray, ${cartCount} ${cartCount === 1 ? 'item' : 'items'} in order`}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#1C120B] hover:bg-[#2A180E] text-white font-bold text-xs border border-white/15 hover:border-amber-400/50 transition-all cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ShoppingBag className="w-4 h-4 text-[#E6B87D]" aria-hidden="true" />
            <span className="hidden xs:inline">Order Tray</span>
            {cartCount > 0 ? (
              <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#8B1E1E] text-white text-[11px] font-extrabold flex items-center justify-center border border-amber-300/40 shadow-sm animate-pulse">
                {cartCount}
              </span>
            ) : (
              <span className="text-[11px] text-[#A8988C] font-normal">
                0
              </span>
            )}
          </button>

          {/* Management / Admin Button - Only shown when logged in as Owner/Admin */}
          {isAdmin && (
            <button
              id="nav-admin-dashboard-btn"
              onClick={() => handleNavClick('admin')}
              aria-label="Open Cafe Management and Admin Dashboard"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                activePage === 'admin'
                  ? 'bg-[#8B1E1E] text-white border border-red-400/40 shadow-sm'
                  : 'bg-white/5 text-[#E6B87D] hover:bg-white/10 border border-white/10'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" aria-hidden="true" />
              <span className="hidden sm:inline">Admin Panel</span>
            </button>
          )}

          {/* Sign In / Sign Out */}
          {currentUser ? (
            <button
              onClick={logout}
              aria-label={`Signed in as ${currentUser.displayName || currentUser.email}. Click to sign out`}
              title="Sign Out"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#A8988C] hover:text-white border border-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              id="nav-signin-btn"
              onClick={() => setIsAuthModalOpen(true)}
              aria-label="Open customer sign in dialog"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#8B1E1E] hover:bg-[#A32323] text-white text-xs font-bold transition-all border border-red-400/40 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <UserIcon className="w-3.5 h-3.5 text-amber-200" aria-hidden="true" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden p-2 rounded-full bg-white/5 text-white border border-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <MenuIcon className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Rounded Semi-Transparent Theme */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-menu"
          aria-label="Mobile dropdown menu"
          className="md:hidden mt-2 max-w-7xl mx-auto bg-[#120B07]/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-colors ${
                  isActive
                    ? 'bg-[#8B1E1E] text-white border border-red-400/40'
                    : 'text-[#D6C7B8] hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-amber-300" aria-hidden="true" />}
              </button>
            );
          })}

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            {!currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full py-2.5 rounded-full bg-[#8B1E1E] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm border border-red-400/40"
              >
                <UserIcon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Customer Sign In</span>
              </button>
            ) : (
              <div className="flex items-center justify-between w-full text-xs text-[#A8988C] px-2">
                <span>{currentUser.displayName || currentUser.email}</span>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-red-400 font-bold"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};
