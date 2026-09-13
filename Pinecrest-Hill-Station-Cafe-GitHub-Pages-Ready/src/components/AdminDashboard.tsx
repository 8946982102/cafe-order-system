import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, ProductCategory, OrderStatus } from '../types';
import { 
  ShieldCheck, 
  ShoppingBag, 
  Coffee, 
  DollarSign, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  RefreshCw, 
  X, 
  Save, 
  AlertCircle,
  Eye,
  Sliders,
  Utensils,
  Sparkles,
  LogOut,
  Check,
  Search,
  Key,
  Flame,
  ArrowRight,
  TrendingUp,
  Tag,
  Store,
  Percent,
  Layers,
  Image as ImageIcon
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    isAdmin, 
    loginAsAdminDirect, 
    logout,
    orders, 
    updateOrderStatus, 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    toggleProductStock, 
    resetProductsToDefault,
    settings, 
    updateSettings,
    setActivePage 
  } = useApp();

  // Admin login states
  const [adminEmailInput, setAdminEmailInput] = useState('owner@pinecrestcafe.com');
  const [adminPassInput, setAdminPassInput] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'promotions' | 'settings'>('orders');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState<string>('');

  // Product filtering & search
  const [productSearchQuery, setProductSearchQuery] = useState<string>('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');

  // Product editing / creation state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState<ProductCategory>('coffee');
  const [prodPrice, setProdPrice] = useState<number>(5.50);
  const [prodDiscountPercent, setProdDiscountPercent] = useState<number>(0);
  const [prodImage, setProdImage] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodAltitude, setProdAltitude] = useState('');
  const [prodPrepTime, setProdPrepTime] = useState<number>(5);
  const [prodIsSpecial, setProdIsSpecial] = useState<boolean>(false);
  const [prodTags, setProdTags] = useState('');
  
  // Extra add-ons for the product
  const [prodExtraAddOns, setProdExtraAddOns] = useState<{ name: string; price: number }[]>([
    { name: 'Extra Himalayan Espresso Shot', price: 1.50 },
    { name: 'Wild Thyme Honey Spoon', price: 0.85 }
  ]);
  const [newAddOnName, setNewAddOnName] = useState('');
  const [newAddOnPrice, setNewAddOnPrice] = useState<number>(1.00);

  // Promotions & Discounts Settings state
  const [promoCodeInput, setPromoCodeInput] = useState<string>(settings.activePromoCode || 'HIGHLAND10');
  const [promoDiscountPctInput, setPromoDiscountPctInput] = useState<number>(settings.promoDiscountPercent || 10);
  const [specialOfferTextInput, setSpecialOfferTextInput] = useState<string>(settings.specialOfferText || 'Enjoy 10% off mountain orchard brews & bakery specials with code HIGHLAND10');
  const [promoSaveMessage, setPromoSaveMessage] = useState<string>('');

  // Settings form state
  const [cafeName, setCafeName] = useState(settings.cafeName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [announcement, setAnnouncement] = useState(settings.announcement);
  const [openingHours, setOpeningHours] = useState(settings.openingHours);
  const [phone, setPhone] = useState(settings.phone);
  const [email, setEmail] = useState(settings.email);
  const [address, setAddress] = useState(settings.address);
  const [deliveryFee, setDeliveryFee] = useState<number>(settings.deliveryFee);
  const [isOpen, setIsOpen] = useState<boolean>(settings.isOpen ?? true);
  const [settingsSavedMessage, setSettingsSavedMessage] = useState('');

  // Curated High-Definition Image Presets for Cafe Owner
  const imagePresets = [
    { name: 'Cold-Press Juice', url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80' },
    { name: 'Mountain Espresso', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80' },
    { name: 'Hot Spiced Toddy', url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80' },
    { name: 'Terracotta Chai', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80' },
    { name: 'Butter Croissant', url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80' },
    { name: 'Almond Brioche', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80' },
    { name: 'Mountain Galette', url: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80' },
    { name: 'Herbal Infusion', url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80' }
  ];

  // Protect Admin Dashboard if not authenticated
  if (!isAdmin) {
    const handleSecretAdminLogin = (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      setLoginError('');
      if (adminPassInput === 'admin123' || adminPassInput === '9911' || adminEmailInput.includes('owner')) {
        loginAsAdminDirect(adminPassInput || 'admin123');
      } else {
        setLoginError('Invalid credentials. Use the owner credentials provided below.');
      }
    };

    return (
      <div className="min-h-[85vh] bg-[#0D0805] text-[#FAF5EF] py-12 px-4 flex items-center justify-center">
        <div className="w-full max-w-lg bg-[#140D09] rounded-3xl border border-[#2B170E] p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Header Badge */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#8B1E1E] text-white flex items-center justify-center mx-auto shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] border border-[#A63232]/40">
              <ShieldCheck className="w-8 h-8 text-amber-200" />
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FAF5EF]">
              Cafe Owner & Manager Portal
            </h2>
            <p className="text-xs text-[#A8988C] max-w-sm mx-auto leading-relaxed">
              Pinecrest Hill Station operational command. Manage live kitchen orders, menu inventory catalog, discounts, and branding.
            </p>
          </div>

          {/* ⚡ 1-Click Instant Owner Login Button (Glossy without gradient) */}
          <div className="space-y-2">
            <button
              type="button"
              id="instant-admin-login-btn"
              onClick={() => loginAsAdminDirect()}
              className="w-full py-4 px-6 rounded-2xl bg-[#8B1E1E] hover:bg-[#A32323] text-white font-bold text-sm tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_4px_16px_rgba(0,0,0,0.4)] flex items-center justify-center gap-2.5 transition-all active:scale-98 border border-[#A63232]/60 cursor-pointer"
            >
              <Key className="w-4 h-4 text-amber-300" />
              <span>1-Click Owner Access (Direct Sign In)</span>
            </button>
            <p className="text-[11px] text-center text-[#7A6B5F]">
              Click above for instant full operational control as verified Cafe Owner.
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#26150C] w-full" />
            <span className="bg-[#140D09] px-3 text-[10px] uppercase font-bold text-[#7A6B5F] absolute">
              Or Sign In with Credentials
            </span>
          </div>

          <form onSubmit={handleSecretAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#E6B87D] mb-1">
                Owner Email
              </label>
              <input
                type="email"
                required
                value={adminEmailInput}
                onChange={(e) => setAdminEmailInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#1C120B] border border-[#381F14] text-sm text-[#FAF5EF] placeholder-[#7A6B5F] focus:ring-2 focus:ring-[#8B1E1E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#E6B87D] mb-1">
                Password / PIN
              </label>
              <input
                type="password"
                required
                value={adminPassInput}
                onChange={(e) => setAdminPassInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#1C120B] border border-[#381F14] text-sm text-[#FAF5EF] placeholder-[#7A6B5F] focus:ring-2 focus:ring-[#8B1E1E] focus:outline-none"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-300 bg-red-950/60 p-3 rounded-xl border border-red-800">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#1C120B] hover:bg-[#2A1910] text-[#FAF5EF] border border-[#381F14] font-bold text-xs tracking-wide transition-colors"
            >
              Sign In With Password
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => setActivePage('home')}
              className="text-xs text-[#A8988C] hover:text-[#FAF5EF] underline font-medium"
            >
              ← Return to Public Website
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const activeOrdersCount = orders.filter(
    (o) => o.status === 'placed' || o.status === 'confirmed' || o.status === 'preparing'
  ).length;

  const completedOrdersCount = orders.filter(
    (o) => o.status === 'delivered'
  ).length;

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all') {
      if (orderStatusFilter === 'active') {
        const isActive = o.status === 'placed' || o.status === 'confirmed' || o.status === 'preparing';
        if (!isActive) return false;
      } else if (o.status !== orderStatusFilter) {
        return false;
      }
    }

    if (orderSearchQuery.trim()) {
      const q = orderSearchQuery.toLowerCase();
      const matchNum = o.orderNumber.toLowerCase().includes(q);
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchPhone = o.customerPhone.toLowerCase().includes(q);
      const matchAddr = o.tableOrAddress.toLowerCase().includes(q);
      if (!matchNum && !matchName && !matchPhone && !matchAddr) return false;
    }

    return true;
  });

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    if (productCategoryFilter !== 'all' && p.category !== productCategoryFilter) {
      return false;
    }
    if (productSearchQuery.trim()) {
      const q = productSearchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchTags = p.tags.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTags) return false;
    }
    return true;
  });

  // Open product modal for Add / Edit
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProdName('');
    setProdCategory('coffee');
    setProdPrice(5.50);
    setProdDiscountPercent(0);
    setProdImage('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80');
    setProdDesc('');
    setProdAltitude('High Range Mist Slopes • 6,800 Ft');
    setProdPrepTime(5);
    setProdIsSpecial(false);
    setProdTags('Artisanal, Organic, Hillside');
    setProdExtraAddOns([
      { name: 'Extra Himalayan Espresso Shot', price: 1.50 },
      { name: 'Wild Thyme Honey Spoon', price: 0.85 }
    ]);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProdName(prod.name);
    setProdCategory(prod.category);
    setProdPrice(prod.price);
    setProdDiscountPercent(prod.discountPercent || 0);
    setProdImage(prod.image);
    setProdDesc(prod.description);
    setProdAltitude(prod.altitudeOrigin || '');
    setProdPrepTime(prod.prepTimeMinutes || 5);
    setProdIsSpecial(!!prod.isChefSpecial);
    setProdTags(prod.tags.join(', '));
    setProdExtraAddOns(prod.extraAddOns && prod.extraAddOns.length > 0 ? prod.extraAddOns : [
      { name: 'Extra Himalayan Espresso Shot', price: 1.50 },
      { name: 'Wild Thyme Honey Spoon', price: 0.85 }
    ]);
    setIsProductModalOpen(true);
  };

  const handleAddCustomAddOn = () => {
    if (!newAddOnName.trim()) return;
    setProdExtraAddOns([
      ...prodExtraAddOns,
      { name: newAddOnName.trim(), price: Number(newAddOnPrice) }
    ]);
    setNewAddOnName('');
    setNewAddOnPrice(1.00);
  };

  const handleRemoveCustomAddOn = (index: number) => {
    setProdExtraAddOns(prodExtraAddOns.filter((_, idx) => idx !== index));
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = prodTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingProduct) {
      await updateProduct({
        ...editingProduct,
        name: prodName,
        category: prodCategory,
        price: Number(prodPrice),
        discountPercent: Number(prodDiscountPercent) || 0,
        extraAddOns: prodExtraAddOns,
        image: prodImage,
        description: prodDesc,
        altitudeOrigin: prodAltitude,
        prepTimeMinutes: Number(prodPrepTime),
        isChefSpecial: prodIsSpecial,
        tags: tagArray,
      });
    } else {
      await addProduct({
        name: prodName,
        category: prodCategory,
        price: Number(prodPrice),
        discountPercent: Number(prodDiscountPercent) || 0,
        extraAddOns: prodExtraAddOns,
        rating: 5.0,
        reviewsCount: 1,
        image: prodImage,
        description: prodDesc,
        inStock: true,
        altitudeOrigin: prodAltitude,
        prepTimeMinutes: Number(prodPrepTime),
        isChefSpecial: prodIsSpecial,
        tags: tagArray,
        customizationOptions: {
          sweetnessLevels: ['Natural Sweet', 'Zero Added Sugar'],
          temperature: ['Hot & Steaming', 'Iced Mountain Style']
        }
      });
    }

    setIsProductModalOpen(false);
  };

  const handleSavePromotions = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings({
      ...settings,
      activePromoCode: promoCodeInput.trim().toUpperCase(),
      promoDiscountPercent: Number(promoDiscountPctInput),
      specialOfferText: specialOfferTextInput.trim(),
    });
    setPromoSaveMessage('✓ Store promo code and customer discount updated live across the website!');
    setTimeout(() => setPromoSaveMessage(''), 4000);
  };

  const handleBulkDiscount = async (category: string | 'all', percent: number) => {
    const targetProducts = category === 'all' 
      ? products 
      : products.filter(p => p.category === category);

    for (const p of targetProducts) {
      await updateProduct({
        ...p,
        discountPercent: percent,
      });
    }
    setPromoSaveMessage(`✓ Applied ${percent}% discount to ${targetProducts.length} items!`);
    setTimeout(() => setPromoSaveMessage(''), 4000);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings({
      ...settings,
      cafeName,
      tagline,
      announcement,
      openingHours,
      phone,
      email,
      address,
      deliveryFee: Number(deliveryFee),
      isOpen,
    });
    setSettingsSavedMessage('✓ Cafe settings and announcements updated live across the entire website!');
    setTimeout(() => setSettingsSavedMessage(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0D0805] text-[#FAF5EF] py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Control Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#140D09] p-6 rounded-3xl border border-[#2B170E] shadow-2xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#8B1E1E] text-white flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] border border-[#A63232]/40">
              <ShieldCheck className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#E6B87D]">Pinecrest Operations Hub</span>
              <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FAF5EF]">
                Owner & Kitchen Console
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Real-Time Store Status Toggle Pill */}
            <button
              onClick={() => {
                const nextOpen = !isOpen;
                setIsOpen(nextOpen);
                updateSettings({ ...settings, isOpen: nextOpen });
              }}
              title="Click to toggle store operational status"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C120B] border border-[#381F14] text-xs font-semibold text-[#FAF5EF] hover:border-[#E6B87D] transition-colors shadow-sm"
            >
              <span className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-red-500'}`} />
              <span>{isOpen ? 'Store Active (Open)' : 'Store Paused (Orders Blocked)'}</span>
            </button>

            <button
              onClick={() => setActivePage('home')}
              className="px-4 py-2 rounded-full bg-[#1C120B] hover:bg-[#2A1910] text-[#FAF5EF] text-xs font-semibold border border-[#381F14] flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-[#E6B87D]" /> View Public Site
            </button>

            <button
              onClick={() => {
                logout();
                setActivePage('home');
              }}
              className="px-4 py-2 rounded-full bg-[#8B1E1E] hover:bg-[#A32323] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm border border-[#A63232]/50"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Operational Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#140D09] border border-[#2B170E] shadow-lg">
            <div className="flex items-center justify-between text-[#A8988C] mb-2">
              <span className="text-xs font-medium">Gross Cafe Revenue</span>
              <div className="w-7 h-7 rounded-full bg-[#1C120B] flex items-center justify-center text-[#E6B87D]">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FAF5EF]">
              ${totalRevenue.toFixed(2)}
            </p>
            <span className="text-[11px] text-[#E6B87D] font-semibold mt-1 block">Live from customer orders</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#140D09] border border-[#2B170E] shadow-lg">
            <div className="flex items-center justify-between text-[#A8988C] mb-2">
              <span className="text-xs font-medium">Total Tickets</span>
              <div className="w-7 h-7 rounded-full bg-[#1C120B] flex items-center justify-center text-[#E6B87D]">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FAF5EF]">
              {orders.length}
            </p>
            <span className="text-[11px] text-[#A8988C] mt-1 block">All-time tickets placed</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#140D09] border border-[#2B170E] shadow-lg">
            <div className="flex items-center justify-between text-[#A8988C] mb-2">
              <span className="text-xs font-medium">Active In-Kitchen</span>
              <div className="w-7 h-7 rounded-full bg-[#1C120B] flex items-center justify-center text-[#8B1E1E]">
                <Coffee className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="font-serif-display text-2xl sm:text-3xl font-bold text-[#E6B87D]">
              {activeOrdersCount}
            </p>
            <span className="text-[11px] text-[#A8988C] mt-1 block">Placed / Brewing right now</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#140D09] border border-[#2B170E] shadow-lg">
            <div className="flex items-center justify-between text-[#A8988C] mb-2">
              <span className="text-xs font-medium">Completed Deliveries</span>
              <div className="w-7 h-7 rounded-full bg-[#1C120B] flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FAF5EF]">
              {completedOrdersCount}
            </p>
            <span className="text-[11px] text-[#A8988C] mt-1 block">Fulfilled deliveries & pickups</span>
          </div>
        </div>

        {/* Tab Navigation (Solid Glossy Buttons) */}
        <div className="flex items-center gap-2 border-b border-[#26150C] pb-3 overflow-x-auto">
          {[
            { id: 'orders', label: `Orders Queue (${orders.length})`, icon: ShoppingBag },
            { id: 'products', label: `Menu Items Catalog (${products.length})`, icon: Utensils },
            { id: 'promotions', label: 'Discounts & Promo Center', icon: Percent },
            { id: 'settings', label: 'Cafe Branding & Store Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-[#8B1E1E] text-white border-[#A63232]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.35)]'
                    : 'bg-[#140D09] text-[#A8988C] hover:bg-[#1C120B] border-[#2B170E]'
                }`}
              >
                <Icon className="w-4 h-4 text-amber-200" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* TAB 1: LIVE ORDERS QUEUE */}
        {/* ========================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#140D09] rounded-2xl border border-[#2B170E] flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-[#7A6B5F] absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by ticket #, guest, phone, table..."
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#1C120B] border border-[#381F14] text-xs text-[#FAF5EF] placeholder-[#7A6B5F] focus:outline-none focus:border-[#8B1E1E]"
                />
                {orderSearchQuery && (
                  <button 
                    onClick={() => setOrderSearchQuery('')}
                    className="absolute right-3 top-2.5 text-[#7A6B5F] hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status filter pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
                {['all', 'active', 'placed', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                      orderStatusFilter === st
                        ? 'bg-[#8B1E1E] text-white shadow-sm'
                        : 'bg-[#1C120B] text-[#A8988C] hover:bg-[#26180F] border border-[#381F14]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center bg-[#140D09] rounded-3xl border border-[#2B170E] space-y-2">
                <Coffee className="w-12 h-12 text-[#E6B87D] mx-auto opacity-70 mb-2" />
                <p className="font-serif-display text-xl font-bold text-[#FAF5EF]">No orders matching criteria</p>
                <p className="text-xs text-[#A8988C]">Customer orders submitted from the menu or cart drawer will stream here automatically.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 sm:p-6 rounded-2xl bg-[#140D09] border border-[#2B170E] shadow-xl space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#26150C]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif-display text-2xl font-bold text-[#FAF5EF]">
                            {order.orderNumber}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white uppercase ${
                            order.status === 'placed' ? 'bg-amber-600' :
                            order.status === 'confirmed' ? 'bg-blue-600' :
                            order.status === 'preparing' ? 'bg-[#8B1E1E]' :
                            order.status === 'ready' ? 'bg-emerald-600' :
                            order.status === 'delivered' ? 'bg-emerald-800' : 'bg-gray-700'
                          }`}>
                            {order.status}
                          </span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1C120B] border border-[#381F14] text-[#E6B87D] font-medium capitalize">
                            {order.deliveryMethod.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-[#A8988C] mt-1">
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Guest: <strong>{order.customerName}</strong> ({order.customerPhone})
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="font-serif-display text-2xl font-bold text-[#E6B87D]">
                          ${order.total.toFixed(2)}
                        </span>
                        <span className="text-[11px] text-[#A8988C] block">
                          Destination: <strong className="text-[#FAF5EF]">{order.tableOrAddress}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#1C120B] border border-[#381F14] flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-[#FAF5EF]">{item.quantity}x {item.product.name}</span>
                            {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                              <p className="text-[10px] text-[#A8988C] truncate max-w-[180px]">
                                {[item.selectedOptions.sweetness, item.selectedOptions.milk, item.selectedOptions.temperature].filter(Boolean).join(' • ')}
                              </p>
                            )}
                          </div>
                          <span className="text-[#E6B87D] font-bold">${item.itemTotal.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    {order.notes && (
                      <p className="text-xs text-amber-300 bg-amber-950/30 p-2.5 rounded-xl border border-amber-800/40">
                        Kitchen Note: {order.notes}
                      </p>
                    )}

                    {/* Status updater actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#26150C]">
                      <span className="text-xs text-[#A8988C]">
                        Payment: <strong className="text-[#FAF5EF] uppercase">{order.paymentMethod?.replace(/_/g, ' ') || 'Cash on Counter'}</strong>
                      </span>

                      <div className="flex items-center gap-1.5">
                        {(['placed', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'] as OrderStatus[]).map((status) => (
                          <button
                            key={status}
                            onClick={() => updateOrderStatus(order.id, status)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                              order.status === status
                                ? 'bg-[#8B1E1E] text-white shadow-sm'
                                : 'bg-[#1C120B] text-[#A8988C] hover:bg-[#26180F] border border-[#381F14]'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: MENU ITEMS CATALOG & INVENTORY */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#140D09] p-5 rounded-2xl border border-[#2B170E]">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-64">
                  <Search className="w-4 h-4 text-[#7A6B5F] absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search catalog items..."
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#1C120B] border border-[#381F14] text-xs text-[#FAF5EF] placeholder-[#7A6B5F] focus:outline-none focus:border-[#8B1E1E]"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {['all', 'juice', 'coffee', 'tea', 'bakery'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setProductCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                        productCategoryFilter === cat
                          ? 'bg-[#8B1E1E] text-white shadow-sm'
                          : 'bg-[#1C120B] text-[#A8988C] hover:bg-[#26180F] border border-[#381F14]'
                      }`}
                    >
                      {cat === 'all' ? 'All Categories' : cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetProductsToDefault}
                  className="px-3.5 py-2 rounded-xl bg-[#1C120B] hover:bg-[#26180F] text-[#A8988C] hover:text-white border border-[#381F14] text-xs font-medium flex items-center gap-1.5"
                  title="Reset menu items to default signature set"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restore Defaults</span>
                </button>

                <button
                  type="button"
                  id="admin-add-product-btn"
                  onClick={handleOpenAddProduct}
                  className="px-4 py-2 rounded-xl bg-[#8B1E1E] hover:bg-[#A32323] text-white font-bold text-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] border border-[#A63232]/50 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Creation</span>
                </button>
              </div>
            </div>

            {/* Product Table */}
            <div className="bg-[#140D09] rounded-3xl border border-[#2B170E] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#FAF5EF]">
                  <thead className="bg-[#1C120B] text-[#A8988C] uppercase tracking-wider font-semibold border-b border-[#2B170E]">
                    <tr>
                      <th className="p-4">Item & Image</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price & Discount</th>
                      <th className="p-4">Add-ons</th>
                      <th className="p-4">Prep</th>
                      <th className="p-4">Inventory Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#26150C]">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#1A100B] transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-12 h-12 rounded-xl object-cover border border-[#381F14] shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-serif-display text-sm font-bold text-[#FAF5EF] truncate">
                                  {prod.name}
                                </span>
                                {prod.isChefSpecial && (
                                  <span className="px-1.5 py-0.5 rounded-md bg-[#8B1E1E] text-white text-[9px] font-bold uppercase">
                                    Signature
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-[#A8988C] truncate max-w-xs">{prod.description}</p>
                              {prod.altitudeOrigin && (
                                <span className="text-[10px] text-[#E6B87D]">📍 {prod.altitudeOrigin}</span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="p-4 capitalize text-[#D6C7B8] font-medium">
                          {prod.category}
                        </td>

                        <td className="p-4">
                          {prod.discountPercent && prod.discountPercent > 0 ? (
                            <div>
                              <span className="font-bold text-sm text-[#E6B87D]">
                                ${(prod.price * (1 - prod.discountPercent / 100)).toFixed(2)}
                              </span>
                              <span className="text-[11px] text-[#8A796C] line-through ml-1.5">
                                ${prod.price.toFixed(2)}
                              </span>
                              <span className="block text-[10px] text-emerald-400 font-bold">
                                {prod.discountPercent}% OFF
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold text-sm text-[#FAF5EF]">
                              ${prod.price.toFixed(2)}
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-[#A8988C]">
                          {prod.extraAddOns?.length ? (
                            <span className="text-[11px] font-medium text-[#E6B87D]">
                              {prod.extraAddOns.length} extra treats
                            </span>
                          ) : (
                            <span className="text-[11px] text-[#7A6B5F]">Standard</span>
                          )}
                        </td>

                        <td className="p-4 text-[#A8988C]">
                          {prod.prepTimeMinutes ? `${prod.prepTimeMinutes}m` : '3m'}
                        </td>

                        <td className="p-4">
                          <button
                            type="button"
                            onClick={() => toggleProductStock(prod.id, !prod.inStock)}
                            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border ${
                              prod.inStock
                                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
                                : 'bg-red-950/80 text-red-300 border-red-800 hover:bg-red-900'
                            }`}
                          >
                            {prod.inStock ? '● In Stock' : '○ Sold Out'}
                          </button>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleOpenEditProduct(prod)}
                              className="p-2 rounded-xl bg-[#1C120B] hover:bg-[#2A1910] text-[#E6B87D] border border-[#381F14] transition-colors"
                              title="Edit item details & discount"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${prod.name}" from the menu?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="p-2 rounded-xl bg-[#1C120B] hover:bg-red-950 text-red-400 border border-[#381F14] transition-colors"
                              title="Delete item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: DISCOUNTS & PROMOTIONS MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'promotions' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#140D09] rounded-3xl border border-[#2B170E] p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <h3 className="font-serif-display text-2xl font-bold text-[#FAF5EF] flex items-center gap-2">
                  <Percent className="w-6 h-6 text-[#E6B87D]" />
                  Discount Codes & Special Deals
                </h3>
                <p className="text-xs text-[#A8988C] mt-1">
                  Manage active customer checkout promo codes, seasonal discounts, and bulk price reductions.
                </p>
              </div>

              <form onSubmit={handleSavePromotions} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#E6B87D] mb-1">
                      Active Customer Promo Code
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. HIGHLAND10"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1C120B] border border-[#381F14] text-sm text-[#FAF5EF] uppercase font-bold tracking-wider focus:outline-none focus:border-[#8B1E1E]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#E6B87D] mb-1">
                      Checkout Discount Percentage (%)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={90}
                      required
                      value={promoDiscountPctInput}
                      onChange={(e) => setPromoDiscountPctInput(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1C120B] border border-[#381F14] text-sm text-[#FAF5EF] font-bold focus:outline-none focus:border-[#8B1E1E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#E6B87D] mb-1">
                    Seasonal Offer / Promo Announcement Text
                  </label>
                  <textarea
                    rows={2}
                    value={specialOfferTextInput}
                    onChange={(e) => setSpecialOfferTextInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1C120B] border border-[#381F14] text-xs text-[#FAF5EF] focus:outline-none focus:border-[#8B1E1E]"
                  />
                </div>

                {promoSaveMessage && (
                  <p className="p-3 rounded-xl bg-emerald-950 text-emerald-300 font-semibold border border-emerald-800 flex items-center gap-2">
                    <Check className="w-4 h-4" /> {promoSaveMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#8B1E1E] hover:bg-[#A32323] text-white font-bold text-xs tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] border border-[#A63232]/50 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Save className="w-4 h-4" /> Save Active Promotion
                </button>
              </form>

              {/* Bulk Quick Discounts */}
              <div className="pt-6 border-t border-[#26150C] space-y-3">
                <h4 className="font-serif-display text-lg font-bold text-[#FAF5EF] flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#E6B87D]" />
                  1-Click Category Discount Presets
                </h4>
                <p className="text-xs text-[#A8988C]">
                  Apply instant discounts directly to individual menu creations without changing base prices.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => handleBulkDiscount('bakery', 15)}
                    className="p-3 rounded-2xl bg-[#1C120B] hover:bg-[#26180F] border border-[#381F14] text-left transition-all flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-xs text-[#FAF5EF]">15% Off All Bakery</p>
                      <p className="text-[10px] text-[#A8988C]">Applies to croissants, brioches, tarts</p>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-[#8B1E1E] text-white text-[11px] font-bold">Apply</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleBulkDiscount('juice', 10)}
                    className="p-3 rounded-2xl bg-[#1C120B] hover:bg-[#26180F] border border-[#381F14] text-left transition-all flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-xs text-[#FAF5EF]">10% Off Cold-Press Juices</p>
                      <p className="text-[10px] text-[#A8988C]">Morning orchard harvest discount</p>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-[#8B1E1E] text-white text-[11px] font-bold">Apply</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleBulkDiscount('coffee', 10)}
                    className="p-3 rounded-2xl bg-[#1C120B] hover:bg-[#26180F] border border-[#381F14] text-left transition-all flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-xs text-[#FAF5EF]">10% Off Mountain Brews</p>
                      <p className="text-[10px] text-[#A8988C]">Pour-overs and single-origins</p>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-[#8B1E1E] text-white text-[11px] font-bold">Apply</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleBulkDiscount('all', 0)}
                    className="p-3 rounded-2xl bg-[#1C120B] hover:bg-red-950/40 border border-[#381F14] text-left transition-all flex items-center justify-between text-red-300"
                  >
                    <div>
                      <p className="font-bold text-xs">Clear All Discounts</p>
                      <p className="text-[10px] text-[#A8988C]">Reset all menu items to base price</p>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-[#26180F] border border-[#381F14] text-[11px] font-bold">Reset</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Active Promo Card Preview */}
            <div className="bg-[#140D09] rounded-3xl border border-[#2B170E] p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E6B87D]">
                <Sparkles className="w-4 h-4" /> Live Customer Voucher
              </div>

              <div className="p-5 rounded-2xl bg-[#1C120B] border border-[#381F14] space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#E6B87D]">
                    Customer Discount Code
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#8B1E1E] text-white">
                    {promoDiscountPctInput}% OFF
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#0D0805] border border-[#381F14] text-center">
                  <span className="font-mono text-xl font-bold tracking-widest text-amber-200">
                    {promoCodeInput || 'HIGHLAND10'}
                  </span>
                </div>

                <p className="text-xs text-[#A8988C] leading-relaxed">
                  {specialOfferTextInput}
                </p>
              </div>

              <p className="text-[11px] text-[#7A6B5F] leading-relaxed">
                Customers can enter this code directly in the cart tray drawer to receive an instantaneous {promoDiscountPctInput}% deduction on their order total.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: CAFE BRANDING & STORE SETTINGS */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#140D09] rounded-3xl border border-[#2B170E] p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <h3 className="font-serif-display text-2xl font-bold text-[#FAF5EF]">
                  Customize Cafe Branding & Operations
                </h3>
                <p className="text-xs text-[#A8988C] mt-1">
                  Updates here will immediately modify headers, notification marquee banner, footer, addresses, and delivery fees across the whole live app.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                {/* Store Status Toggle */}
                <div className="p-4 rounded-2xl bg-[#1C120B] border border-[#381F14] flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-[#FAF5EF]">Store Accepting Customer Orders</p>
                    <p className="text-xs text-[#A8988C]">When paused, visitors will see a graceful store pause notice.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isOpen ? 'bg-emerald-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        isOpen ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block font-bold text-[#E6B87D] mb-1">Cafe Brand Name</label>
                  <input
                    type="text"
                    value={cafeName}
                    onChange={(e) => setCafeName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1C120B] border border-[#381F14] text-sm text-[#FAF5EF] focus:outline-none focus:border-[#8B1E1E]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#E6B87D] mb-1">Cafe Tagline</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1C120B] border border-[#381F14] text-sm text-[#FAF5EF] focus:outline-none focus:border-[#8B1E1E]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#E6B87D] mb-1">
                    Top Announcement Marquee Banner (Broadcast text to all visitors)
                  </label>
                  <input
                    type="text"
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1C120B] border border-[#381F14] text-sm text-[#FAF5EF] focus:outline-none focus:border-[#8B1E1E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#E6B87D] mb-1">Opening Hours</label>
                    <input
                      type="text"
                      value={openingHours}
                      onChange={(e) => setOpeningHours(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1C120B] border border-[#381F14] text-sm text-[#FAF5EF] focus:outline-none focus:border-[#8B1E1E]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#E6B87D] mb-1">Hill Courier Delivery Fee ($)</label>
                    <input
                      type="number"
                      step="0.25"
                      value={deliveryFee}
                      onChange={(e) => setDeliveryFee(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1C120B] border border-[#381F14] text-sm text-[#FAF5EF] focus:outline-none focus:border-[#8B1E1E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#E6B87D] mb-1">Direct Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1C120B] border border-[#381F14] text-sm text-[#FAF5EF] focus:outline-none focus:border-[#8B1E1E]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#E6B87D] mb-1">Inquiry Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1C120B] border border-[#381F14] text-sm text-[#FAF5EF] focus:outline-none focus:border-[#8B1E1E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#E6B87D] mb-1">Hill Station Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1C120B] border border-[#381F14] text-sm text-[#FAF5EF] focus:outline-none focus:border-[#8B1E1E]"
                  />
                </div>

                {settingsSavedMessage && (
                  <p className="p-3.5 rounded-xl bg-emerald-950 text-emerald-300 font-medium border border-emerald-800 flex items-center gap-2">
                    <Check className="w-4 h-4" /> {settingsSavedMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#8B1E1E] hover:bg-[#A32323] text-white font-bold text-xs tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] border border-[#A63232]/50 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Save className="w-4 h-4" /> Save Live Customizations
                </button>
              </form>
            </div>

            {/* Right: Live Storefront Preview */}
            <div className="bg-[#140D09] rounded-3xl border border-[#2B170E] p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E6B87D]">
                <Store className="w-4 h-4" /> Storefront Preview
              </div>

              <div className="p-4 rounded-2xl bg-[#0A0604] border border-[#2B170E] space-y-3">
                <div className="p-2 rounded-lg bg-[#8B1E1E]/20 border border-[#8B1E1E]/40 text-[11px] text-amber-200">
                  📢 <strong>Banner:</strong> {announcement}
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif-display text-xl font-bold text-[#FAF5EF]">{cafeName}</h4>
                  <p className="text-xs text-[#E6B87D]">{tagline}</p>
                </div>

                <div className="space-y-1 text-xs text-[#A8988C] pt-2 border-t border-[#26150C]">
                  <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#E6B87D]" /> {openingHours}</p>
                  <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#E6B87D]" /> {address}</p>
                  <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#E6B87D]" /> {phone}</p>
                </div>

                <div className="pt-2">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    isOpen ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-red-950 text-red-300 border border-red-800'
                  }`}>
                    {isOpen ? '● Currently Accepting Orders' : '○ Kitchen Paused'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* PRODUCT ADD / EDIT MODAL */}
      {/* Full Support: Name, Image, Price, Discount %, Extra Add-Ons */}
      {/* ========================================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-[#140D09] rounded-3xl border border-[#2B170E] shadow-2xl p-6 sm:p-8 space-y-5 my-8 text-[#FAF5EF]">
            <div className="flex items-center justify-between border-b border-[#26150C] pb-3">
              <div>
                <h3 className="font-serif-display text-xl font-bold text-[#FAF5EF]">
                  {editingProduct ? 'Edit Menu Item & Recipe' : 'Add New Menu Item'}
                </h3>
                <p className="text-xs text-[#A8988C]">
                  Configure item pricing, discount, photo, and extra add-ons
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#1C120B] flex items-center justify-center text-[#A8988C] hover:text-white border border-[#381F14]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#E6B87D] mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alpine Berry Hibiscus Splash"
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C120B] border border-[#381F14] text-sm text-[#FAF5EF] placeholder-[#7A6B5F] focus:outline-none focus:border-[#8B1E1E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#E6B87D] mb-1">Category</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#1C120B] border border-[#381F14] text-xs font-semibold text-[#FAF5EF] focus:outline-none cursor-pointer"
                  >
                    <option value="juice">Fresh Cold-Pressed Juice</option>
                    <option value="coffee">Mountain Coffee & Brew</option>
                    <option value="tea">Artisanal Tea & Chai</option>
                    <option value="bakery">Wood-Fired Bakery</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#E6B87D] mb-1">Base Price ($) *</label>
                  <input
                    type="number"
                    step="0.25"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C120B] border border-[#381F14] text-sm text-[#FAF5EF] focus:outline-none focus:border-[#8B1E1E]"
                  />
                </div>
              </div>

              {/* Discount Percentage */}
              <div className="p-3.5 rounded-2xl bg-[#1C120B] border border-[#381F14] space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#E6B87D] flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5" /> Item Discount (%)
                  </label>
                  {prodDiscountPercent > 0 && (
                    <span className="text-emerald-400 font-bold text-[11px]">
                      Customer pays: ${(prodPrice * (1 - prodDiscountPercent / 100)).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    max={90}
                    value={prodDiscountPercent}
                    onChange={(e) => setProdDiscountPercent(Number(e.target.value))}
                    className="w-24 px-3 py-1.5 rounded-xl bg-[#140D09] border border-[#381F14] text-xs text-[#FAF5EF] font-bold"
                  />
                  <div className="flex gap-1.5">
                    {[0, 10, 15, 20].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setProdDiscountPercent(pct)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                          prodDiscountPercent === pct 
                            ? 'bg-[#8B1E1E] text-white border-[#A63232]' 
                            : 'bg-[#140D09] text-[#A8988C] border-[#381F14]'
                        }`}
                      >
                        {pct === 0 ? 'No Disc.' : `${pct}% Off`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image URL & Instant Preview */}
              <div className="space-y-2">
                <label className="block font-bold text-[#E6B87D] mb-1">Image URL & Photo</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={prodImage}
                    onChange={(e) => setProdImage(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#1C120B] border border-[#381F14] text-xs text-[#FAF5EF] placeholder-[#7A6B5F] focus:outline-none focus:border-[#8B1E1E]"
                  />
                  {prodImage && (
                    <img 
                      src={prodImage} 
                      alt="Preview" 
                      className="w-10 h-10 rounded-xl object-cover border border-[#381F14] shrink-0" 
                    />
                  )}
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <span className="text-[10px] text-[#7A6B5F] self-center">Presets:</span>
                  {imagePresets.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setProdImage(preset.url)}
                      className="text-[10px] px-2 py-0.5 rounded-lg bg-[#1C120B] hover:bg-[#26180F] text-[#D6C7B8] border border-[#381F14]"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Add-Ons Manager */}
              <div className="p-3.5 rounded-2xl bg-[#1C120B] border border-[#381F14] space-y-2.5">
                <label className="block font-bold text-[#E6B87D]">
                  Custom Extra Add-ons (Pastries, Shots, Syrups)
                </label>
                
                {/* Existing add-ons */}
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {prodExtraAddOns.map((addon, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-[#140D09] border border-[#2B170E] text-xs">
                      <span className="text-[#FAF5EF] font-medium">{addon.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#E6B87D] font-bold">+${addon.price.toFixed(2)}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomAddOn(idx)}
                          className="text-[#A8988C] hover:text-red-400 p-0.5"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add new add-on form line */}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add-on name (e.g. Extra Butter)"
                    value={newAddOnName}
                    onChange={(e) => setNewAddOnName(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-[#140D09] border border-[#381F14] text-xs text-[#FAF5EF]"
                  />
                  <input
                    type="number"
                    step="0.25"
                    placeholder="Price"
                    value={newAddOnPrice}
                    onChange={(e) => setNewAddOnPrice(Number(e.target.value))}
                    className="w-20 px-2.5 py-1.5 rounded-xl bg-[#140D09] border border-[#381F14] text-xs text-[#FAF5EF]"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomAddOn}
                    className="px-3 py-1.5 rounded-xl bg-[#8B1E1E] text-white text-xs font-bold shrink-0 hover:bg-[#A32323]"
                  >
                    + Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#E6B87D] mb-1">Description *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Artisanal recipe details, tasting notes, and freshness description..."
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1C120B] border border-[#381F14] text-xs text-[#FAF5EF] placeholder-[#7A6B5F] focus:outline-none focus:border-[#8B1E1E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#E6B87D] mb-1">Altitude / Origin</label>
                  <input
                    type="text"
                    placeholder="e.g. Manali Highland Orchard"
                    value={prodAltitude}
                    onChange={(e) => setProdAltitude(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1C120B] border border-[#381F14] text-xs text-[#FAF5EF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#E6B87D] mb-1">Prep Time (mins)</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={prodPrepTime}
                    onChange={(e) => setProdPrepTime(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1C120B] border border-[#381F14] text-xs text-[#FAF5EF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#E6B87D] mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="Cold-Pressed, Organic, Chef Special"
                  value={prodTags}
                  onChange={(e) => setProdTags(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1C120B] border border-[#381F14] text-xs text-[#FAF5EF] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="chefSpecialCheck"
                  checked={prodIsSpecial}
                  onChange={(e) => setProdIsSpecial(e.target.checked)}
                  className="rounded text-[#8B1E1E] focus:ring-[#8B1E1E]"
                />
                <label htmlFor="chefSpecialCheck" className="text-xs font-semibold text-[#FAF5EF]">
                  Feature as Signature / Chef Special
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[#26150C]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#1C120B] text-[#A8988C] hover:text-white text-xs font-semibold border border-[#381F14]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#8B1E1E] hover:bg-[#A32323] text-white text-xs font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] border border-[#A63232]/50 cursor-pointer"
                >
                  Save Creation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
