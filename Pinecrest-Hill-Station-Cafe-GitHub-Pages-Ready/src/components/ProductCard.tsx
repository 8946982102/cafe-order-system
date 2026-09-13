import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Sparkles, Plus, Minus, Check, Clock } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setIsCartOpen, cart, updateQuantity } = useApp();
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Check how many of this item are already in the order tray
  const inCartItems = cart.filter((ci) => ci.productId === product.id);
  const itemInCartCount = inCartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  const primaryCartItem = inCartItems[0];

  // When clicking Order: Add item and directly open the Order page / tray
  const handleDirectOrder = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!product.inStock) return;

    if (itemInCartCount === 0) {
      addToCart(product);
    }
    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
      setIsCartOpen(true);
    }, 200);
  };

  // Keyboard navigation handler for the card
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDirectOrder();
    }
  };

  const discountedPrice = product.discountPercent && product.discountPercent > 0
    ? product.price * (1 - product.discountPercent / 100)
    : product.price;

  return (
    <article
      id={`product-card-${product.id}`}
      role="article"
      aria-label={`${product.name}, $${discountedPrice.toFixed(2)}${product.inStock ? '' : ', currently sold out'}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={() => handleDirectOrder()}
      className={`group relative bg-[#140D09] rounded-2xl border border-[#2E1A11] overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-200 hover:border-amber-400/40 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
        !product.inStock ? 'opacity-60 grayscale-[30%]' : ''
      }`}
    >
      {/* Product Image & Badges */}
      <div className="relative w-full h-36 xs:h-40 sm:h-48 overflow-hidden bg-[#0A0604]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          loading="lazy"
        />

        {/* Clean top badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none gap-1">
          <div className="flex items-center gap-1 flex-wrap">
            {product.isChefSpecial ? (
              <span className="px-2 py-0.5 rounded-full bg-[#8B1E1E] text-white text-[10px] font-bold tracking-wide flex items-center gap-1 shadow-md border border-red-400/40">
                <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                <span>Special</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[#D6C7B8] border border-white/10 text-[10px] font-semibold capitalize">
                {product.category}
              </span>
            )}

            {product.discountPercent && product.discountPercent > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-black shadow-sm">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {!product.inStock ? (
            <span className="px-2 py-0.5 rounded-full bg-[#3D1A1A] text-red-300 border border-red-700 text-[10px] font-bold">
              Sold Out
            </span>
          ) : itemInCartCount > 0 ? (
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-[10px] font-bold">
              {itemInCartCount} in tray
            </span>
          ) : null}
        </div>
      </div>

      {/* Product Content Details: Properly Placed (Fixes Screenshot 2 crowding) */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Dish Title: 2 lines allowed so text is NEVER clipped awkwardly like "Smoked Pine..." */}
          <h3 className="text-xs xs:text-sm sm:text-base font-bold text-[#FAF5EF] group-hover:text-[#E6B87D] transition-colors leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Simple Clean 1-Line Description */}
          <p className="text-[11px] sm:text-xs text-[#A8988C] mt-1 line-clamp-1 leading-normal">
            {product.description}
          </p>
        </div>

        {/* Bottom Section: Price & Full-Width Order Action (Never cramped) */}
        <div className="pt-2 border-t border-[#26150C] space-y-2">
          
          {/* Price & Prep Time Row */}
          <div className="flex items-baseline justify-between gap-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-[#FAF5EF]">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discountPercent && product.discountPercent > 0 && (
                <span className="text-xs text-[#8A796C] line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <span className="text-[10px] text-[#A8988C] flex items-center gap-0.5 shrink-0">
              <Clock className="w-2.5 h-2.5 text-[#E6B87D]" />
              <span>{product.prepTimeMinutes ? `${product.prepTimeMinutes}m` : 'Fresh'}</span>
            </span>
          </div>

          {/* Clean, Full-Width Action Button (Fixes ugly cramped "+ Order" buttons from Screenshot 2) */}
          {itemInCartCount > 0 ? (
            <div 
              className="w-full flex items-center justify-between bg-[#1C120B] p-1 rounded-xl border border-emerald-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => {
                  if (primaryCartItem) {
                    updateQuantity(primaryCartItem.cartItemId, primaryCartItem.quantity - 1);
                  }
                }}
                aria-label={`Decrease quantity of ${product.name}`}
                className="w-7 h-7 rounded-lg bg-[#2A1910] hover:bg-[#3D2518] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={(e) => handleDirectOrder(e)}
                aria-label={`View ${product.name} in tray`}
                className="text-xs font-bold text-emerald-300 hover:text-white px-2 cursor-pointer flex items-center gap-1"
              >
                <span>{itemInCartCount} added</span>
                <span className="text-[10px] text-[#A8988C]">View</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (primaryCartItem) {
                    updateQuantity(primaryCartItem.cartItemId, primaryCartItem.quantity + 1);
                  } else {
                    addToCart(product);
                  }
                }}
                aria-label={`Increase quantity of ${product.name}`}
                className="w-7 h-7 rounded-lg bg-[#2A1910] hover:bg-[#3D2518] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3 text-amber-300" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              id={`order-btn-${product.id}`}
              onClick={(e) => handleDirectOrder(e)}
              disabled={!product.inStock}
              aria-label={`Order ${product.name} for $${discountedPrice.toFixed(2)}`}
              className={`w-full py-2 sm:py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm ${
                !product.inStock
                  ? 'bg-[#221711] text-[#7A6A5E] cursor-not-allowed border border-[#2B170E]'
                  : isAddedSuccess
                    ? 'bg-emerald-700 text-white border border-emerald-500'
                    : 'bg-[#8B1E1E] hover:bg-[#A32323] text-white border border-red-400/40'
              }`}
            >
              {isAddedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Added to Tray</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-200" />
                  <span>Order Now</span>
                </>
              )}
            </button>
          )}

        </div>
      </div>
    </article>
  );
};
