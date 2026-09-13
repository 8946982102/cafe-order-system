import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  Coffee, 
  MapPin, 
  PackageCheck, 
  Bike, 
  Search, 
  ShoppingBag, 
  Phone,
  AlertCircle
} from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const { currentOrder, orders, searchOrderById, setActivePage } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [searchError, setSearchError] = useState('');

  // The order to display: either searchedOrder, or currentOrder, or the most recent order in the list
  const activeOrder: Order | null = searchedOrder || currentOrder || (orders.length > 0 ? orders[0] : null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    if (!searchQuery.trim()) return;

    const found = searchOrderById(searchQuery);
    if (found) {
      setSearchedOrder(found);
    } else {
      setSearchError(`No order found matching "${searchQuery}". Please check your order token.`);
    }
  };

  const steps: { key: OrderStatus; label: string; description: string; icon: any }[] = [
    {
      key: 'placed',
      label: 'Order Placed',
      description: 'Ticket received by Pinecrest Hill Barista',
      icon: Clock,
    },
    {
      key: 'confirmed',
      label: 'Confirmed',
      description: 'Accepted & queued in kitchen hearth',
      icon: CheckCircle2,
    },
    {
      key: 'preparing',
      label: 'Brewing & Pressing',
      description: 'Handcrafting drinks & wood-firing bakery',
      icon: Coffee,
    },
    {
      key: 'ready',
      label: 'Ready for Pickup / Out',
      description: 'Packaged in insulated thermal carrier',
      icon: PackageCheck,
    },
    {
      key: 'delivered',
      label: 'Fulfilled',
      description: 'Served or delivered fresh to cottage',
      icon: Bike,
    },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return 0;
      case 'confirmed':
        return 1;
      case 'preparing':
        return 2;
      case 'ready':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  const currentStepIndex = activeOrder ? getStepIndex(activeOrder.status) : 0;

  return (
    <div className="min-h-screen bg-[#0D0805] text-[#FAF5EF] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E6B87D]">
            Kitchen Dispatch Connection
          </span>
          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#FAF5EF]">
            Live Order Status Tracker
          </h1>
          <p className="text-xs sm:text-sm text-[#A8988C]">
            Watch your espresso extractions, raw juice pressings, and oven treats progress step-by-step.
          </p>
        </div>

        {/* Search Bar for Order Lookup */}
        <div className="bg-[#140D09] rounded-3xl border border-[#2B170E] p-4 sm:p-6 shadow-xl">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#7A6B5F]" />
              <input
                type="text"
                placeholder="Enter Order # (e.g. PINECREST-3829)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#1C120B] border border-[#381F14] text-xs sm:text-sm text-[#FAF5EF] placeholder-[#7A6B5F] focus:ring-2 focus:ring-[#991B1B] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#991B1B] to-[#B91C1C] hover:from-[#7F1D1D] hover:to-[#991B1B] text-white text-xs font-semibold tracking-wide transition-all shadow-md"
            >
              Lookup
            </button>
          </form>
          {searchError && (
            <p className="text-xs text-red-400 mt-2 flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {searchError}
            </p>
          )}
        </div>

        {/* If no order is found or exists */}
        {!activeOrder ? (
          <div className="p-10 rounded-3xl bg-[#140D09] border border-[#2B170E] text-center space-y-4 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#1C120B] text-[#E6B87D] flex items-center justify-center mx-auto border border-[#381F14]">
              <Coffee className="w-8 h-8" />
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-[#FAF5EF]">No Active Orders Yet</h3>
            <p className="text-xs text-[#A8988C] max-w-sm mx-auto">
              Place an order from our artisanal menu to watch live brewing status here.
            </p>
            <button
              onClick={() => {
                setActivePage('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-2.5 rounded-full bg-[#991B1B] text-white text-xs font-semibold hover:bg-[#7F1D1D] transition-all shadow-md"
            >
              Explore Menu & Order
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Top Order Hero Card */}
            <div className="bg-[#140D09] rounded-3xl border border-[#2B170E] p-6 sm:p-8 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#26150C]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif-display text-3xl sm:text-4xl font-bold text-[#FAF5EF]">
                      {activeOrder.orderNumber}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#991B1B] text-white font-semibold capitalize shadow-xs">
                      {activeOrder.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-[#A8988C] mt-1">
                    Placed on {new Date(activeOrder.createdAt).toLocaleDateString()} at {new Date(activeOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-[#A8988C] block font-medium">Recipient & Seating</span>
                  <span className="text-sm font-bold text-[#FAF5EF] block">{activeOrder.customerName}</span>
                  <span className="text-xs text-[#E6B87D] font-semibold flex items-center gap-1 sm:justify-end mt-0.5">
                    <MapPin className="w-3.5 h-3.5" /> {activeOrder.tableOrAddress} ({activeOrder.deliveryMethod.replace('_', ' ')})
                  </span>
                </div>
              </div>

              {/* Progress Stepper Visualizer */}
              <div className="py-8">
                <div className="relative">
                  {/* Progress Line */}
                  <div className="hidden sm:block absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1.5 bg-[#26150C] rounded-full z-0">
                    <div 
                      className="h-full bg-gradient-to-r from-[#991B1B] to-[#B91C1C] rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                    />
                  </div>

                  {/* Steps Icons */}
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative z-10">
                    {steps.map((step, idx) => {
                      const isCompleted = idx <= currentStepIndex;
                      const isCurrent = idx === currentStepIndex;
                      const StepIcon = step.icon;

                      return (
                        <div key={step.key} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                              isCurrent
                                ? 'bg-gradient-to-br from-[#991B1B] to-[#B91C1C] text-white ring-4 ring-red-500/30 scale-110'
                                : isCompleted
                                  ? 'bg-[#991B1B] text-white'
                                  : 'bg-[#1C120B] text-[#6A5A4F] border border-[#381F14]'
                            }`}
                          >
                            <StepIcon className="w-5 h-5" />
                          </div>

                          <div>
                            <p className={`text-xs font-bold leading-snug ${isCurrent ? 'text-[#E6B87D]' : isCompleted ? 'text-[#FAF5EF]' : 'text-[#7A6B5F]'}`}>
                              {step.label}
                            </p>
                            <p className="text-[11px] text-[#A8988C] hidden sm:block max-w-[120px] mx-auto leading-tight mt-0.5">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Estimated Ready Banner */}
              <div className="mt-2 p-4 rounded-2xl bg-[#1C120B] border border-[#381F14] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#26180F] text-[#E6B87D] flex items-center justify-center border border-[#3A2215]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-display text-base font-bold text-[#FAF5EF]">
                      {activeOrder.status === 'delivered' 
                        ? 'Order Delivered Fresh!' 
                        : activeOrder.status === 'ready' 
                          ? 'Ready for Counter Handover / With Courier' 
                          : 'Estimated Preparation: ~15-20 Mins'}
                    </h4>
                    <p className="text-xs text-[#A8988C]">
                      {activeOrder.statusUpdates[activeOrder.statusUpdates.length - 1]?.note || 'Our head barista is attending to your ticket.'}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-[#E6B87D] font-semibold flex items-center gap-1.5 bg-[#140D09] px-3.5 py-1.5 rounded-full border border-[#381F14]">
                  <Phone className="w-3.5 h-3.5" /> Cafe Line: (555) 746-3273
                </div>
              </div>

            </div>

            {/* Receipt and Item Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Ordered Items List */}
              <div className="md:col-span-2 bg-[#140D09] rounded-3xl border border-[#2B170E] p-6 shadow-xl space-y-4">
                <h3 className="font-serif-display text-xl font-bold text-[#FAF5EF]">
                  Order Items Breakdown
                </h3>

                <div className="divide-y divide-[#26150C]">
                  {activeOrder.items.map((item) => (
                    <div key={item.cartItemId} className="py-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-xl object-cover border border-[#381F14]"
                        />
                        <div>
                          <p className="text-sm font-bold text-[#FAF5EF]">
                            {item.quantity}x {item.product.name}
                          </p>
                          {/* Options pills */}
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {item.selectedOptions.sweetness && (
                              <span className="text-[10px] text-[#A8988C]">
                                • {item.selectedOptions.sweetness}
                              </span>
                            )}
                            {item.selectedOptions.milk && (
                              <span className="text-[10px] text-[#A8988C]">
                                • {item.selectedOptions.milk}
                              </span>
                            )}
                            {item.selectedOptions.ice && (
                              <span className="text-[10px] text-[#A8988C]">
                                • {item.selectedOptions.ice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-[#FAF5EF]">
                          ${item.itemTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {activeOrder.notes && (
                  <div className="p-3 rounded-xl bg-[#1C120B] border border-[#381F14] text-xs text-[#C4B3A5]">
                    <strong>Customer Request:</strong> {activeOrder.notes}
                  </div>
                )}
              </div>

              {/* Payment Summary */}
              <div className="bg-[#140D09] rounded-3xl border border-[#2B170E] p-6 shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif-display text-xl font-bold text-[#FAF5EF] mb-3">
                    Payment Summary
                  </h3>

                  <div className="space-y-2 text-xs text-[#A8988C]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#FAF5EF]">${activeOrder.subtotal.toFixed(2)}</span>
                    </div>
                    {activeOrder.deliveryFee > 0 && (
                      <div className="flex justify-between">
                        <span>Courier Dispatch</span>
                        <span className="font-semibold text-[#FAF5EF]">${activeOrder.deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Taxes & Surcharge</span>
                      <span className="font-semibold text-[#FAF5EF]">${activeOrder.tax.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-[#26150C] flex justify-between text-base font-bold text-[#FAF5EF]">
                      <span>Paid Total</span>
                      <span className="font-serif-display text-xl text-[#E6B87D]">${activeOrder.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#26150C] text-xs text-[#A8988C]">
                    <span className="block font-medium text-[#FAF5EF]">Payment Method:</span>
                    <span className="font-semibold text-[#E6B87D] capitalize">
                      {activeOrder.paymentMethod.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActivePage('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#991B1B] to-[#B91C1C] hover:from-[#7F1D1D] hover:to-[#991B1B] text-white text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" /> Order More Treats
                </button>
              </div>

            </div>

            {/* Live Updates Timeline */}
            <div className="bg-[#140D09] rounded-3xl border border-[#2B170E] p-6 shadow-xl">
              <h3 className="font-serif-display text-xl font-bold text-[#FAF5EF] mb-4">
                Live Kitchen Event Log
              </h3>

              <div className="space-y-3">
                {activeOrder.statusUpdates.map((update, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="w-2 h-2 rounded-full bg-[#E6B87D] mt-1.5 shadow-xs" />
                    <div>
                      <p className="font-bold text-[#FAF5EF] capitalize">{update.status}</p>
                      <p className="text-[#A8988C]">{update.note}</p>
                      <span className="text-[10px] text-[#7A6B5F]">
                        {new Date(update.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
