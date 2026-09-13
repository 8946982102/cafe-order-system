import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Coffee,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Slide {
  id: string;
  category: 'juice' | 'coffee' | 'bakery' | 'tea';
  badge: string;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
}

const SLIDES: Slide[] = [
  {
    id: 'slide-juice',
    category: 'juice',
    badge: '100% Pure & Cold-Pressed',
    title: 'Pure Mountain Orchard Juices',
    subtitle: 'Freshly harvested apples, Valencia oranges, and organic greens pressed raw with zero added sugar.',
    buttonText: 'Order Cold Juices',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=2000&q=90',
  },
  {
    id: 'slide-coffee',
    category: 'coffee',
    badge: 'Artisanal Roastery',
    title: 'Rich Specialty Mountain Coffee',
    subtitle: 'Single-origin Arabica beans roasted to perfection for a velvety, aromatic morning cup.',
    buttonText: 'Order Hot Coffee',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=2000&q=90',
  },
  {
    id: 'slide-bakery',
    category: 'bakery',
    badge: 'Hearth Wood-Fired',
    title: 'Golden Oven-Fresh Croissants',
    subtitle: 'Flaky layers of French churned butter and warm breakfast pastries straight from the oven.',
    buttonText: 'Order Fresh Bakery',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=2000&q=90',
  },
  {
    id: 'slide-tea',
    category: 'tea',
    badge: 'Slow-Simmered Tradition',
    title: 'Authentic Himalayan Spiced Chai',
    subtitle: 'Traditional hill station tea brewed with crushed cardamom, cinnamon bark, and wild mountain honey.',
    buttonText: 'Order Artisanal Chai',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=2000&q=90',
  },
];

export const Hero: React.FC = () => {
  const { setActivePage, setSelectedCategory, products, setSelectedProductForDetail, setIsCartOpen } = useApp();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [heroSearch, setHeroSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Automatic slide change with continuous transition
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSlide = SLIDES[currentSlideIndex];

  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;
      if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      } else if (e.key === 'ArrowRight') {
        handleNextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevSlide, handleNextSlide]);

  const handleSlideCta = (category: 'juice' | 'coffee' | 'bakery' | 'tea') => {
    setSelectedCategory(category);
    setActivePage('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Instant search results
  const searchResults = heroSearch.trim()
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(heroSearch.toLowerCase()) ||
          p.category.toLowerCase().includes(heroSearch.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(heroSearch.toLowerCase()))
        )
        .slice(0, 4)
    : [];

  const handleSelectSearchResult = (product: typeof products[0]) => {
    setSelectedProductForDetail(product);
    setHeroSearch('');
    setIsSearchFocused(false);
  };

  return (
    /* 
      Clean breathable gap added at the top (pt-5 sm:pt-7 md:pt-8) 
      so the floating Navbar and Hero card have a clear, distinct separation.
    */
    <section 
      aria-label="Cafe Hero & Featured Carousel"
      className="w-full bg-[#0D0805] text-[#FAF5EF] pt-5 sm:pt-7 md:pt-8 pb-8 sm:pb-12"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* 
          HERO CAROUSEL CONTAINER:
          Equipped with ARIA carousel roles, keyboard navigation, and Ken Burns zoom-out effect.
        */}
        <div 
          id="hero-slider-container"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured Pinecrest Specialties"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#140D09] border border-[#2E1A11] shadow-[0_20px_40px_rgba(0,0,0,0.7)] min-h-[460px] sm:min-h-[500px] md:min-h-[540px] flex flex-col justify-end"
        >
          {/* 
            Ken Burns ZOOM-OUT Effect:
            The image starts at scale 1.15 and slowly, smoothly zooms OUT to 1.0 over 6 seconds,
            giving a cinematic feeling with continuous animation.
          */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.16 }}
              animate={{ 
                opacity: 1, 
                scale: 1.0,
                transition: { 
                  scale: { duration: 6.5, ease: [0.25, 1, 0.5, 1] },
                  opacity: { duration: 0.8, ease: 'easeOut' }
                }
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.98,
                transition: { duration: 0.6 }
              }}
              className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
              />
              {/* Premium Gradient Overlays for High Contrast Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0805] via-[#0D0805]/60 to-[#0D0805]/25" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0D0805]/90 via-[#0D0805]/50 to-transparent max-w-3xl" />
            </motion.div>
          </AnimatePresence>

          {/* Slide Content Box */}
          <div className="relative z-10 p-5 sm:p-8 md:p-12 max-w-2xl space-y-3 sm:space-y-4">
            
            {/* Category Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C120B]/90 border border-[#3E2215] backdrop-blur-md text-[#E6B87D] text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <span>{currentSlide.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
              {currentSlide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-[#D6C7B8] font-normal leading-relaxed max-w-xl drop-shadow-sm">
              {currentSlide.subtitle}
            </p>

            {/* Direct 1-Click Ordering CTA Buttons */}
            <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleSlideCta(currentSlide.category)}
                aria-label={`${currentSlide.buttonText} - view ${currentSlide.category} menu`}
                className="px-6 py-3 rounded-xl sm:rounded-2xl bg-[#8B1E1E] hover:bg-[#A32323] text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_6px_20px_rgba(139,30,30,0.5)] flex items-center gap-2 transition-all active:scale-95 border border-red-400/40 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <span>{currentSlide.buttonText}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setActivePage('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                aria-label="View our full cafe and juicery menu"
                className="px-5 py-3 rounded-xl sm:rounded-2xl bg-[#1C120B]/90 hover:bg-[#281810] text-[#FAF5EF] font-semibold text-xs sm:text-sm border border-[#381F14] backdrop-blur-sm transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                View Full Menu
              </button>
            </div>
          </div>

          {/* Slider Controls: Accessible Arrows & Indicators */}
          <div className="relative z-10 px-5 sm:px-8 pb-5 sm:pb-6 flex items-center justify-between">
            {/* Dots / Indicators */}
            <div 
              role="tablist" 
              aria-label="Carousel slide selectors"
              className="flex items-center gap-2"
            >
              {SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlideIndex;
                return (
                  <button
                    key={slide.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Slide ${idx + 1} of ${SLIDES.length}: ${slide.title}`}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      isActive
                        ? 'w-8 bg-[#8B1E1E] shadow-sm'
                        : 'w-2.5 bg-[#42271A] hover:bg-[#633B27]'
                    }`}
                  />
                );
              })}
            </div>

            {/* Arrow Nav Buttons with Screen Reader Labels */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous slide"
                className="w-9 h-9 rounded-xl bg-[#1C120B]/85 hover:bg-[#2B180E] text-[#FAF5EF] border border-[#381F14] backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next slide"
                className="w-9 h-9 rounded-xl bg-[#1C120B]/85 hover:bg-[#2B180E] text-[#FAF5EF] border border-[#381F14] backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

        </div>

        {/* Clean Direct Food Search Bar */}
        <div className="relative mt-5 max-w-xl mx-auto z-20">
          <div className="relative flex items-center">
            <label htmlFor="hero-quick-search-input" className="sr-only">
              Search menu items, cold-pressed juices, coffees, and bakes
            </label>
            <Search className="absolute left-4 w-4 h-4 text-[#A8988C]" aria-hidden="true" />
            <input
              type="text"
              id="hero-quick-search-input"
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search cold-press juice, coffee, croissants..."
              className="w-full pl-11 pr-24 py-3 sm:py-3.5 rounded-2xl bg-[#140D09]/95 border border-[#2E1A11] text-xs sm:text-sm text-[#FAF5EF] placeholder-[#7A6B5F] shadow-lg focus:outline-none focus:border-amber-400/50"
            />
            {heroSearch ? (
              <button
                type="button"
                onClick={() => setHeroSearch('')}
                aria-label="Clear search text"
                className="absolute right-3 px-3 py-1.5 rounded-xl bg-[#1C120B] text-xs text-[#C4B5A5] hover:text-white"
              >
                Clear
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setActivePage('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                aria-label="Browse full menu"
                className="absolute right-2 px-3.5 py-1.5 rounded-xl bg-[#8B1E1E] text-white text-xs font-bold shadow-xs hover:bg-[#A32323] cursor-pointer"
              >
                Browse
              </button>
            )}
          </div>

          {/* Quick Search Autocomplete Results */}
          {isSearchFocused && searchResults.length > 0 && (
            <div 
              role="listbox" 
              aria-label="Search suggestions"
              className="absolute top-full left-0 right-0 mt-2 bg-[#140D09] border border-[#2E1A11] rounded-2xl p-2 shadow-2xl space-y-1 z-30"
            >
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={false}
                  tabIndex={0}
                  onClick={() => handleSelectSearchResult(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSelectSearchResult(item);
                    }
                  }}
                  className="p-2.5 rounded-xl hover:bg-[#1C120B] flex items-center justify-between gap-3 cursor-pointer transition-colors focus-visible:outline-none focus-visible:bg-[#1C120B]"
                >
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="text-xs font-bold text-[#FAF5EF]">{item.name}</p>
                      <p className="text-[10px] text-[#A8988C] capitalize">{item.category}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#E6B87D]">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
