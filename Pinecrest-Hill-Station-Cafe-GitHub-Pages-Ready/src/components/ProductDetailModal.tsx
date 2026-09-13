import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, Clock, Plus, Minus, ShoppingBag, Sparkles } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductForDetail, setSelectedProductForDetail, addToCart, setIsCartOpen } = useApp();
  const product = selectedProductForDetail;

  const [quantity, setQuantity] = useState<number>(1);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  if (!product) return null;

  const handleClose = () => {
    setSelectedProductForDetail(null);
    setQuantity(1);
    setIsAddedSuccess(false);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && product) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product]);

  const handleProceedToOrder = () => {
    if (isAddedSuccess) return;

    addToCart(product, {}, quantity);
    setIsAddedSuccess(true);

    setTimeout(() => {
      handleClose();
      setIsCartOpen(true);
    }, 200);
  };

  const basePrice = product.discountPercent && product.discountPercent > 0
    ? product.price * (1 - product.discountPercent / 100)
    : product.price;

  const currentTotal = (basePrice * quantity).toFixed(2);

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-lg bg-[#140D09] rounded-3xl border border-[#2E1A11] shadow-2xl overflow-hidden my-8 text-[#FAF5EF]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#1C120B]/90 hover:bg-[#2A1910] text-[#FAF5EF] border border-[#381F14] flex items-center justify-center transition-transform hover:scale-105 shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="Close product details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image */}
        <div className="relative w-full h-56 sm:h-64 bg-[#0A0604] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140D09] via-transparent to-black/40" />

          {/* Badges on Image */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            {product.isChefSpecial && (
              <span className="px-3 py-1 rounded-full bg-[#8B1E1E] text-white text-xs font-bold shadow-md flex items-center gap-1.5 border border-red-400/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Chef Special
              </span>
            )}
            {product.discountPercent && product.discountPercent > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-amber-500 text-black text-xs font-black shadow-md">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-5">
          
          {/* Header titles */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-xs font-bold text-[#FAF5EF]">{product.rating}</span>
                <span className="text-[11px] text-[#A8988C]">({product.reviewsCount} reviews)</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#1C120B] text-[#E6B87D] border border-[#381F14] capitalize">
                {product.category}
              </span>
            </div>

            <div className="flex items-baseline justify-between gap-4">
              <h2 id="product-modal-title" className="text-xl sm:text-2xl font-bold text-[#FAF5EF]">
                {product.name}
              </h2>
              
              <div className="text-right shrink-0">
                {product.discountPercent && product.discountPercent > 0 ? (
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-extrabold text-[#E6B87D]">
                      ${basePrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-[#8A796C] line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-xl font-extrabold text-[#FAF5EF]">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A8988C] mt-2 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-3 mt-3 text-xs text-[#E6B87D]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {product.prepTimeMinutes} mins prep
              </span>
              <span className="text-[#8C7B6E]">•</span>
              <span className="text-[#A8988C]">Freshly prepared</span>
            </div>
          </div>

          {/* Simple Quantity Selection */}
          <div className="p-4 rounded-2xl bg-[#180F0A] border border-[#2E1A11] flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#FAF5EF]">Quantity Required</p>
              <p className="text-[11px] text-[#A8988C]">Kitni quantity chahiye select karein</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-2 bg-[#22150E] p-1.5 rounded-xl border border-[#3A2216]">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-[#2E1C12] hover:bg-[#3D2518] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              
              <span className="w-8 text-center text-sm font-black text-white">
                {quantity}
              </span>
              
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-[#2E1C12] hover:bg-[#3D2518] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Total & Action Button */}
          <div className="pt-2 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[#A8988C] block">Total Amount:</span>
              <span className="text-xl font-extrabold text-[#E6B87D]">${currentTotal}</span>
            </div>

            <button
              type="button"
              id="modal-order-now-btn"
              onClick={handleProceedToOrder}
              disabled={!product.inStock}
              className={`flex-1 py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer ${
                !product.inStock
                  ? 'bg-[#221711] text-[#7A6A5E] cursor-not-allowed border border-[#2B170E]'
                  : 'bg-[#8B1E1E] hover:bg-[#A32323] text-white border border-red-400/40'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-amber-200" />
              <span>Proceed to Order Tray (${currentTotal})</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
