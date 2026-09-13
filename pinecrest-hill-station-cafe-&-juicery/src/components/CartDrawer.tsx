import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DeliveryMethod } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  CreditCard, 
  Banknote, 
  Utensils,
  Tag,
  Check,
  Phone,
  User
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartSubtotal, 
    cartCount, 
    placeOrder, 
    currentUser, 
    settings,
    setActivePage
  } = useApp();

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('dine_in');
  const [customerName, setCustomerName] = useState<string>(currentUser?.displayName || '');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [tableOrAddress, setTableOrAddress] = useState<string>('');
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_counter' | 'card_at_pickup' | 'upi_online'>('cash_on_counter');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // Promo code
  const [promoInput, setPromoInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoMessage, setPromoMessage] = useState<string>('');
  const [showPromoField, setShowPromoField] = useState<boolean>(false);

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const deliveryFee = deliveryMethod === 'hotel_delivery' ? settings.deliveryFee : 0;
  
  // Calculate discount
  const discountAmount = appliedPromo 
    ? Number((cartSubtotal * (appliedPromo.percent / 100)).toFixed(2)) 
    : 0;
  
  const discountedSubtotal = Math.max(0, cartSubtotal - discountAmount);
  const tax = Number((discountedSubtotal * settings.taxRate).toFixed(2));
  const grandTotal = (discountedSubtotal + deliveryFee + tax).toFixed(2);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    const activeCode = (settings.activePromoCode || 'HIGHLAND10').toUpperCase();
    const discountPct = settings.promoDiscountPercent || 10;

    if (!code) return;

    if (code === activeCode || code === 'HIGHLAND10' || code === 'WELCOME15' || code === 'CAFE20') {
      const pct = code === 'CAFE20' ? 20 : code === 'WELCOME15' ? 15 : discountPct;
      setAppliedPromo({ code, percent: pct });
      setPromoMessage(`✓ Coupon applied! ${pct}% discount saved.`);
    } else {
      setPromoMessage('Invalid coupon code.');
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (cart.length === 0) {
      setErrorMessage('Your order tray is empty. Please add items to order.');
      return;
    }

    if (!customerName.trim()) {
      setErrorMessage('Please enter customer name (Aapka naam daalein).');
      return;
    }

    if (!customerPhone.trim()) {
      setErrorMessage('Please enter your phone number (Mobile number daalein).');
      return;
    }

    if (!tableOrAddress.trim()) {
      setErrorMessage(
        deliveryMethod === 'dine_in' 
          ? 'Please enter your Table Number.' 
          : 'Please enter your delivery address or pickup note.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await placeOrder({
        customerName: customerName.trim(),
        customerEmail: currentUser?.email || 'guest@pinecrestcafe.com',
        customerPhone: customerPhone.trim(),
        deliveryMethod,
        tableOrAddress: tableOrAddress.trim(),
        notes: orderNotes.trim(),
        paymentMethod,
      });

      setIsCartOpen(false);
      // Navigate directly to track order page
      if (order?.id) {
        setActivePage('track');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-heading"
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
    >
      <div 
        className="w-full max-w-lg bg-[#140D09] h-full shadow-2xl flex flex-col justify-between border-l border-[#2E1A11] animate-in slide-in-from-right duration-300 text-[#FAF5EF]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header - Clean and Prominent */}
        <div className="p-4 sm:p-5 border-b border-[#26150C] flex items-center justify-between bg-[#1A100A] backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#8B1E1E] text-white flex items-center justify-center shadow-md border border-red-400/40" aria-hidden="true">
              <ShoppingBag className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h2 id="cart-drawer-heading" className="text-base sm:text-lg font-bold text-[#FAF5EF]">
                Order Details
              </h2>
              <p className="text-xs text-[#A8988C]">
                {cartCount} {cartCount === 1 ? 'item' : 'items'} in your order tray
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-[#A8988C] hover:text-red-400 transition-colors px-2 py-1 cursor-pointer"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-[#1C120B] hover:bg-[#2A1910] text-[#FAF5EF] border border-[#381F14] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close order tray"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#A8988C] space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1C120B] flex items-center justify-center text-[#E6B87D] border border-[#381F14] shadow-md">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#FAF5EF]">Your Order Tray is Empty</h3>
              <p className="text-xs max-w-xs leading-relaxed text-[#A8988C]">
                Please select delicious items from our menu to place your order.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActivePage('menu');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#8B1E1E] text-white text-xs font-bold transition-all shadow-md cursor-pointer hover:bg-[#A32323]"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Section 1: Order Items & Quantity Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#E6B87D] flex items-center gap-1.5">
                    <span>1. Selected Items & Quantity</span>
                  </h3>
                  <span className="text-[11px] text-[#A8988C]">Adjust quantity below</span>
                </div>

                <div className="space-y-2.5">
                  {cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="p-3 sm:p-3.5 rounded-2xl bg-[#180F0A] border border-[#2E1A11] flex items-center justify-between gap-3 shadow-sm hover:border-[#422518] transition-colors"
                    >
                      {/* Item Image */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-[#2E1A11] shrink-0"
                      />

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#FAF5EF] truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-[#E6B87D] font-semibold mt-0.5">
                          ${item.unitPrice.toFixed(2)} each
                        </div>

                        {/* Total for this item */}
                        <div className="text-xs font-bold text-white mt-1">
                          Total: ${item.itemTotal.toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Stepper (- / +) */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <div className="flex items-center gap-1 bg-[#22150E] p-1 rounded-xl border border-[#3A2216]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-6 h-6 rounded-lg bg-[#2E1C12] hover:bg-[#3D2518] text-white flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          
                          <span className="w-6 text-center text-xs font-black text-white">
                            {item.quantity}
                          </span>
                          
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-6 h-6 rounded-lg bg-[#2E1C12] hover:bg-[#3D2518] text-white flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove item button */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-[#8C7B6E] hover:text-red-400 p-1 transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
                          title="Remove item"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Customer Details Form */}
              <form id="order-checkout-form" onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-[#26150C]">
                
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#E6B87D]">
                  2. Customer Details & Delivery Spot
                </h3>

                {/* Dining Option */}
                <div>
                  <label className="block text-xs font-medium text-[#FAF5EF] mb-1.5">
                    Order Type (Dine-in or Takeaway) *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('dine_in')}
                      className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        deliveryMethod === 'dine_in'
                          ? 'bg-[#8B1E1E] text-white border border-red-400/50 shadow-sm'
                          : 'bg-[#180F0A] text-[#A8988C] border border-[#2E1A11] hover:bg-[#22150E]'
                      }`}
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Dine-In</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('takeaway')}
                      className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        deliveryMethod === 'takeaway'
                          ? 'bg-[#8B1E1E] text-white border border-red-400/50 shadow-sm'
                          : 'bg-[#180F0A] text-[#A8988C] border border-[#2E1A11] hover:bg-[#22150E]'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Takeaway</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('hotel_delivery')}
                      className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        deliveryMethod === 'hotel_delivery'
                          ? 'bg-[#8B1E1E] text-white border border-red-400/50 shadow-sm'
                          : 'bg-[#180F0A] text-[#A8988C] border border-[#2E1A11] hover:bg-[#22150E]'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Room Delivery</span>
                    </button>
                  </div>
                </div>

                {/* Customer Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#FAF5EF] mb-1">
                      Customer Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-3.5 h-3.5 text-[#8C7B6E]" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#180F0A] border border-[#2E1A11] text-xs text-[#FAF5EF] placeholder-[#7A6B5F] focus:outline-none focus:border-[#8B1E1E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#FAF5EF] mb-1">
                      Mobile / Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-3.5 h-3.5 text-[#8C7B6E]" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#180F0A] border border-[#2E1A11] text-xs text-[#FAF5EF] placeholder-[#7A6B5F] focus:outline-none focus:border-[#8B1E1E]"
                      />
                    </div>
                  </div>
                </div>

                {/* Table Number or Address */}
                <div>
                  <label className="block text-xs font-medium text-[#FAF5EF] mb-1">
                    {deliveryMethod === 'dine_in' 
                      ? 'Table Number *' 
                      : deliveryMethod === 'takeaway'
                      ? 'Pickup Name / Note *' 
                      : 'Room Number or Villa Address *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      deliveryMethod === 'dine_in' 
                        ? 'e.g. Table 4 or Balcony Table' 
                        : deliveryMethod === 'takeaway'
                        ? 'e.g. Pickup at counter in 15 mins'
                        : 'e.g. Room 204, Mountain View'
                    }
                    value={tableOrAddress}
                    onChange={(e) => setTableOrAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#180F0A] border border-[#2E1A11] text-xs text-[#FAF5EF] placeholder-[#7A6B5F] focus:outline-none focus:border-[#8B1E1E]"
                  />
                </div>

                {/* Optional Note */}
                <div>
                  <label className="block text-xs font-medium text-[#FAF5EF] mb-1">
                    Special Kitchen Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Extra hot coffee, less sugar, serve together"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#180F0A] border border-[#2E1A11] text-xs text-[#FAF5EF] placeholder-[#7A6B5F] focus:outline-none focus:border-[#8B1E1E]"
                  />
                </div>

                {/* Payment Options */}
                <div>
                  <label className="block text-xs font-medium text-[#FAF5EF] mb-1.5">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash_on_counter')}
                      className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        paymentMethod === 'cash_on_counter'
                          ? 'border-red-400/50 bg-[#8B1E1E] text-white shadow-sm'
                          : 'border-[#2E1A11] bg-[#180F0A] text-[#FAF5EF] hover:bg-[#22150E]'
                      }`}
                    >
                      <Banknote className="w-3.5 h-3.5 text-amber-200" />
                      <span>Cash</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi_online')}
                      className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        paymentMethod === 'upi_online'
                          ? 'border-red-400/50 bg-[#8B1E1E] text-white shadow-sm'
                          : 'border-[#2E1A11] bg-[#180F0A] text-[#FAF5EF] hover:bg-[#22150E]'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>UPI Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card_at_pickup')}
                      className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        paymentMethod === 'card_at_pickup'
                          ? 'border-red-400/50 bg-[#8B1E1E] text-white shadow-sm'
                          : 'border-[#2E1A11] bg-[#180F0A] text-[#FAF5EF] hover:bg-[#22150E]'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5 text-amber-200" />
                      <span>Card</span>
                    </button>
                  </div>
                </div>

                {/* Promo Code Accordion */}
                <div className="pt-1">
                  {!showPromoField ? (
                    <button
                      type="button"
                      onClick={() => setShowPromoField(true)}
                      className="text-xs text-[#E6B87D] hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>Have a discount coupon?</span>
                    </button>
                  ) : (
                    <div className="p-3 rounded-xl bg-[#180F0A] border border-[#2E1A11] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#E6B87D]">Enter Coupon</span>
                        {appliedPromo && (
                          <span className="text-[11px] text-emerald-400 font-bold">
                            ✓ {appliedPromo.percent}% OFF
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. HIGHLAND10"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-[#100905] border border-[#2E1A11] text-xs text-[#FAF5EF] uppercase"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="px-3 py-1.5 rounded-lg bg-[#8B1E1E] text-white text-xs font-bold cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      {promoMessage && (
                        <p className={`text-[11px] ${appliedPromo ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {promoMessage}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Error message */}
                {errorMessage && (
                  <p className="text-xs text-red-300 bg-red-950/70 p-3 rounded-xl border border-red-800">
                    {errorMessage}
                  </p>
                )}

                {/* Section 3: Clean Price Breakdown */}
                <div className="pt-3 border-t border-[#26150C] space-y-1.5 text-xs text-[#A8988C]">
                  <div className="flex justify-between">
                    <span>Order Subtotal</span>
                    <span className="font-semibold text-[#FAF5EF]">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({appliedPromo?.percent}%)</span>
                      <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  {deliveryFee > 0 && (
                    <div className="flex justify-between">
                      <span>Delivery Surcharge</span>
                      <span className="font-semibold text-[#FAF5EF]">${deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST / Taxes (8%)</span>
                    <span className="font-semibold text-[#FAF5EF]">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between pt-2 border-t border-[#26150C] text-base font-bold text-[#FAF5EF]">
                    <span>Total Amount</span>
                    <span className="text-xl text-[#E6B87D] font-extrabold">${grandTotal}</span>
                  </div>
                </div>

                {/* Direct Confirm & Place Order Button */}
                <button
                  type="submit"
                  id="cart-submit-order-btn"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#8B1E1E] hover:bg-[#A32323] text-white font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-75 border border-red-400/40 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Placing Your Order...</span>
                  ) : (
                    <>
                      <span>Confirm & Place Order (${grandTotal})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
