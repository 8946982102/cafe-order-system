import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { 
  Search, 
  CupSoda, 
  Coffee, 
  Sparkles, 
  Utensils, 
  X, 
  Tag,
  Check,
  RotateCcw,
  ArrowUpDown
} from 'lucide-react';
import { motion } from 'motion/react';

export const MenuView: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [onlySignatures, setOnlySignatures] = useState<boolean>(false);
  const [onlyDiscounts, setOnlyDiscounts] = useState<boolean>(false);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  const categories = [
    { id: 'all', label: 'All Items', icon: Sparkles },
    { id: 'juice', label: 'Fresh Juices', icon: CupSoda },
    { id: 'coffee', label: 'Coffee & Brews', icon: Coffee },
    { id: 'bakery', label: 'Bakery & Bakes', icon: Utensils },
    { id: 'tea', label: 'Himalayan Chai', icon: Sparkles },
  ];

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Specials filter
    if (onlySignatures) {
      list = list.filter((p) => p.isChefSpecial);
    }

    // Discount deals filter
    if (onlyDiscounts) {
      list = list.filter((p) => p.discountPercent && p.discountPercent > 0);
    }

    // In-Stock filter
    if (onlyInStock) {
      list = list.filter((p) => p.inStock);
    }

    // Sort
    if (sortBy === 'price-low') {
      list.sort((a, b) => {
        const pA = a.discountPercent ? a.price * (1 - a.discountPercent / 100) : a.price;
        const pB = b.discountPercent ? b.price * (1 - b.discountPercent / 100) : b.price;
        return pA - pB;
      });
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => {
        const pA = a.discountPercent ? a.price * (1 - a.discountPercent / 100) : a.price;
        const pB = b.discountPercent ? b.price * (1 - b.discountPercent / 100) : b.price;
        return pB - pA;
      });
    } else {
      list.sort((a, b) => {
        if (a.isChefSpecial && !b.isChefSpecial) return -1;
        if (!a.isChefSpecial && b.isChefSpecial) return 1;
        return b.rating - a.rating;
      });
    }

    return list;
  }, [products, selectedCategory, searchQuery, onlySignatures, onlyDiscounts, onlyInStock, sortBy]);

  const hasActiveFilters = Boolean(
    selectedCategory !== 'all' || 
    searchQuery.trim() || 
    onlySignatures || 
    onlyDiscounts || 
    onlyInStock || 
    sortBy !== 'featured'
  );

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setOnlySignatures(false);
    setOnlyDiscounts(false);
    setOnlyInStock(false);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-[#0D0805] text-[#FAF5EF] py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Clean Menu Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C120B] border border-[#2E1A11] text-xs font-bold text-[#E6B87D]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Fresh Kitchen & Juicery Menu</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#FAF5EF] tracking-tight">
            Order Food & Drinks
          </h1>
          <p className="text-xs sm:text-sm text-[#A8988C]">
            Select your favorite cold-pressed juices, espresso roasts, hot pastries, and spiced teas.
          </p>
        </div>

        {/* Clean Search & Quick Filters Bar */}
        <div className="max-w-3xl mx-auto space-y-3">
          {/* Search Box */}
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-[#8C7B6E]" />
            <input
              type="text"
              id="menu-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, apple, croissant, cappuccino..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[#140D09] border border-[#2E1A11] text-xs sm:text-sm text-[#FAF5EF] placeholder-[#7A6B5F] focus:outline-none focus:border-[#8B1E1E] focus:ring-1 focus:ring-[#8B1E1E] shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 text-[#8C7B6E] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Primary Category Selector Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  id={`cat-pill-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#8B1E1E] text-white shadow-sm border border-[#A63232]/60'
                      : 'bg-[#140D09] text-[#A8988C] hover:text-white hover:bg-[#1C120B] border border-[#2E1A11]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-200' : 'text-[#E6B87D]'}`} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-black/25 text-white' : 'bg-[#1C120B] text-[#7A6B5F]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Secondary Quick Toggles & Sort */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setOnlySignatures(!onlySignatures)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  onlySignatures
                    ? 'bg-[#8B1E1E] text-white border border-[#A63232]/50'
                    : 'bg-[#140D09] text-[#A8988C] hover:text-white border border-[#2E1A11]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Chef Specials</span>
                {onlySignatures && <Check className="w-3 h-3 text-white" />}
              </button>

              <button
                onClick={() => setOnlyDiscounts(!onlyDiscounts)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  onlyDiscounts
                    ? 'bg-[#8B1E1E] text-white border border-[#A63232]/50'
                    : 'bg-[#140D09] text-[#A8988C] hover:text-white border border-[#2E1A11]'
                }`}
              >
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>Discount Deals</span>
                {onlyDiscounts && <Check className="w-3 h-3 text-white" />}
              </button>

              <button
                onClick={() => setOnlyInStock(!onlyInStock)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  onlyInStock
                    ? 'bg-[#8B1E1E] text-white border border-[#A63232]/50'
                    : 'bg-[#140D09] text-[#A8988C] hover:text-white border border-[#2E1A11]'
                }`}
              >
                <span>In Stock Only</span>
                {onlyInStock && <Check className="w-3 h-3 text-white" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="px-2.5 py-1.5 rounded-xl text-xs text-[#E6B87D] hover:text-white bg-[#140D09] border border-[#2E1A11] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}

              {/* Sort selector */}
              <div className="flex items-center gap-1.5 bg-[#140D09] border border-[#2E1A11] px-2.5 py-1.5 rounded-xl text-xs">
                <ArrowUpDown className="w-3 h-3 text-[#A8988C]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs text-[#FAF5EF] focus:outline-none cursor-pointer"
                >
                  <option value="featured" className="bg-[#140D09] text-[#FAF5EF]">Featured</option>
                  <option value="price-low" className="bg-[#140D09] text-[#FAF5EF]">Price: Low to High</option>
                  <option value="price-high" className="bg-[#140D09] text-[#FAF5EF]">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Items Count Info */}
        <div className="flex items-center justify-between text-xs text-[#A8988C] pt-2 border-t border-[#26150C]">
          <span>Showing <strong className="text-[#FAF5EF]">{filteredProducts.length}</strong> items</span>
          <span className="text-[11px] text-[#E6B87D]">Click "Order" on any item to view tray & enter details</span>
        </div>

        {/* Main Product Grid (Clean, spacious, 2 to 4 columns) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-3 bg-[#140D09] rounded-3xl border border-[#2E1A11] p-8 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#1C120B] text-[#E6B87D] flex items-center justify-center mx-auto border border-[#381F14]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#FAF5EF]">No matching items found</h3>
            <p className="text-xs text-[#A8988C]">
              Try searching with another word or reset your active filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-[#8B1E1E] text-white text-xs font-bold cursor-pointer"
            >
              Show All Menu Items
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
