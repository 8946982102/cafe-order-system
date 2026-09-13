import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Clock, MapPin, Coffee, ArrowRight, Sparkles, Receipt } from 'lucide-react';
import { motion } from 'motion/react';

export const OrderSuccessView: React.FC = () => {
  const { currentOrder, setActivePage } = useApp();

  if (!currentOrder) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-[#0D0805] text-[#FAF5EF]">
        <h2 className="font-serif-display text-2xl font-bold text-[#FAF5EF]">No Recent Order</h2>
        <button
          onClick={() => setActivePage('menu')}
          className="mt-4 px-6 py-2.5 rounded-full bg-[#991B1B] text-white text-xs font-semibold hover:bg-[#7F1D1D] transition-colors shadow-md"
        >
          Go to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-[#0D0805] text-[#FAF5EF] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-2xl bg-[#140D09] rounded-3xl border border-[#2B170E] shadow-2xl p-6 sm:p-10 text-center space-y-7 relative overflow-hidden text-[#FAF5EF]"
      >
        {/* Decorative Top Mist Pattern */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#991B1B] via-[#E6B87D] to-[#991B1B]" />

        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-[#1C120B] border border-[#381F14] text-[#E6B87D] flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>

        {/* Celebratory Heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1C120B] border border-[#381F14] text-xs font-semibold text-[#E6B87D]">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Ticket # {currentOrder.orderNumber}
          </div>
          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#FAF5EF]">
            Your Mountain Order is Placed!
          </h1>
          <p className="text-sm sm:text-base text-[#A8988C] max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-[#FAF5EF]">{currentOrder.customerName}</strong>. Our baristas and kitchen hearth at Pinecrest have received your ticket and are preparing your fresh order.
          </p>
        </div>

        {/* Key Order Info Box */}
        <div className="p-5 rounded-2xl bg-[#1C120B] border border-[#381F14] grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#A8988C] block font-bold">Estimated Time</span>
            <span className="text-base font-bold text-[#FAF5EF] flex items-center gap-1 mt-0.5">
              <Clock className="w-4 h-4 text-[#E6B87D]" /> ~{currentOrder.estimatedMinutes} Mins
            </span>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#A8988C] block font-bold">Location / Table</span>
            <span className="text-sm font-bold text-[#FAF5EF] flex items-center gap-1 mt-0.5 truncate">
              <MapPin className="w-4 h-4 text-[#E6B87D] shrink-0" /> {currentOrder.tableOrAddress}
            </span>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#A8988C] block font-bold">Total Paid / Due</span>
            <span className="font-serif-display text-xl font-bold text-[#E6B87D] mt-0.5 block">
              ${currentOrder.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Item preview */}
        <div className="text-left bg-[#1C120B] rounded-2xl border border-[#381F14] p-4 divide-y divide-[#26150C]">
          <div className="pb-2 text-xs font-bold uppercase tracking-wider text-[#E6B87D] flex items-center gap-1.5">
            <Receipt className="w-3.5 h-3.5" /> Ordered Items ({currentOrder.items.length})
          </div>
          <div className="pt-2 space-y-2 max-h-48 overflow-y-auto">
            {currentOrder.items.map((it) => (
              <div key={it.cartItemId} className="flex justify-between items-center text-xs py-1">
                <span className="text-[#FAF5EF] font-semibold">
                  {it.quantity}x {it.product.name}
                </span>
                <span className="text-[#E6B87D] font-bold">
                  ${it.itemTotal.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            id="success-track-btn"
            onClick={() => {
              setActivePage('track');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#991B1B] to-[#B91C1C] hover:from-[#7F1D1D] hover:to-[#991B1B] text-white text-xs font-bold tracking-wide shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 border border-red-400/30"
          >
            <Coffee className="w-4 h-4" />
            <span>Track Live Status in Real-Time</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setActivePage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#1C120B] hover:bg-[#26180F] text-[#FAF5EF] border border-[#381F14] text-xs font-semibold transition-colors"
          >
            Back to Menu
          </button>
        </div>

      </motion.div>
    </div>
  );
};
