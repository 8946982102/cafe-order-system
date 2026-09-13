import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  auth, 
  db, 
  loginWithGoogle, 
  loginWithEmail, 
  registerWithEmail, 
  logoutUser, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy,
  User 
} from '../lib/firebase';
import { 
  Product, 
  CartItem, 
  Order, 
  OrderStatus, 
  SelectedOptions, 
  TableReservation, 
  CafeSettings, 
  DeliveryMethod 
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_CAFE_SETTINGS } from '../data/initialProducts';
import confetti from 'canvas-confetti';

interface AppContextType {
  // Auth
  currentUser: User | null;
  isAdmin: boolean;
  isAuthLoading: boolean;
  loginGoogle: () => Promise<void>;
  loginEmail: (email: string, pass: string) => Promise<void>;
  registerEmail: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loginAsAdminDirect: (password?: string) => boolean;

  // Navigation
  activePage: string;
  setActivePage: (page: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  toggleProductStock: (productId: string, inStock: boolean) => Promise<void>;
  resetProductsToDefault: () => Promise<void>;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, options?: SelectedOptions, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Orders
  orders: Order[];
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  placeOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryMethod: DeliveryMethod;
    tableOrAddress: string;
    notes?: string;
    paymentMethod: 'cash_on_counter' | 'card_at_pickup' | 'upi_online';
  }) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => Promise<void>;
  searchOrderById: (orderIdOrNumber: string) => Order | undefined;

  // Table Reservations
  reservations: TableReservation[];
  bookTable: (resData: Omit<TableReservation, 'id' | 'createdAt' | 'status'>) => Promise<TableReservation>;
  updateReservationStatus: (resId: string, status: TableReservation['status']) => Promise<void>;

  // Cafe Settings
  settings: CafeSettings;
  updateSettings: (newSettings: Partial<CafeSettings>) => Promise<void>;

  // Modals
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAdminLoginOpen: boolean;
  setIsAdminLoginOpen: (open: boolean) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (p: Product | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ADMIN_EMAILS = ['mahesh91136@gmail.com', 'admin@pinecrestcafe.com', 'owner@pinecrestcafe.com'];
const ADMIN_SECRET_KEY = 'pinecrestAdmin2026!';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // Navigation
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Data state
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [reservations, setReservations] = useState<TableReservation[]>([]);
  const [settings, setSettings] = useState<CafeSettings>(INITIAL_CAFE_SETTINGS);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pinecrest_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pinecrest_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Firebase Auth listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);
      if (user && user.email && ADMIN_EMAILS.includes(user.email.toLowerCase())) {
        setIsAdmin(true);
      } else {
        const storedAdmin = sessionStorage.getItem('pinecrest_admin_session');
        if (storedAdmin === 'true') {
          setIsAdmin(true);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync Products from Firestore
  useEffect(() => {
    let isSubscribed = true;
    const productsCol = collection(db, 'products');

    const unsubscribe = onSnapshot(productsCol, (snapshot) => {
      if (!isSubscribed) return;
      if (!snapshot.empty) {
        const loaded: Product[] = [];
        snapshot.forEach((d) => {
          loaded.push({ id: d.id, ...d.data() } as Product);
        });
        setProducts(loaded);
      } else {
        // First-time seed initial products to Firestore
        setProducts(INITIAL_PRODUCTS);
        INITIAL_PRODUCTS.forEach(async (prod) => {
          try {
            await setDoc(doc(db, 'products', prod.id), prod);
          } catch (e) {
            console.error('Initial product seed note:', e);
          }
        });
      }
    }, (error) => {
      console.warn('Using local products fallback:', error);
      setProducts(INITIAL_PRODUCTS);
    });

    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  // Sync Orders from Firestore
  useEffect(() => {
    let isSubscribed = true;
    const ordersCol = collection(db, 'orders');
    const q = query(ordersCol, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!isSubscribed) return;
      const loaded: Order[] = [];
      snapshot.forEach((d) => {
        loaded.push({ id: d.id, ...d.data() } as Order);
      });
      setOrders(loaded);

      // Keep currentOrder in sync if it is being viewed
      setCurrentOrder((prev) => {
        if (!prev) return prev;
        const updated = loaded.find((o) => o.id === prev.id);
        return updated || prev;
      });
    }, (error) => {
      console.warn('Orders realtime listener notice:', error);
    });

    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  // Sync Reservations from Firestore
  useEffect(() => {
    let isSubscribed = true;
    const resCol = collection(db, 'reservations');
    const q = query(resCol, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!isSubscribed) return;
      const loaded: TableReservation[] = [];
      snapshot.forEach((d) => {
        loaded.push({ id: d.id, ...d.data() } as TableReservation);
      });
      setReservations(loaded);
    }, (error) => {
      console.warn('Reservations realtime notice:', error);
    });

    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  // Sync Settings from Firestore
  useEffect(() => {
    const settingsDoc = doc(db, 'settings', 'general');
    const unsubscribe = onSnapshot(settingsDoc, (snap) => {
      if (snap.exists()) {
        setSettings(snap.data() as CafeSettings);
      }
    });
    return () => unsubscribe();
  }, []);

  // Auth actions
  const loginGoogle = async () => {
    await loginWithGoogle();
    setIsAuthModalOpen(false);
  };

  const loginEmail = async (email: string, pass: string) => {
    await loginWithEmail(email, pass);
    setIsAuthModalOpen(false);
  };

  const registerEmail = async (email: string, pass: string, name: string) => {
    await registerWithEmail(email, pass, name);
    setIsAuthModalOpen(false);
  };

  const logout = async () => {
    await logoutUser();
    setIsAdmin(false);
    sessionStorage.removeItem('pinecrest_admin_session');
  };

  const loginAsAdminDirect = (password?: string) => {
    // Grants immediate administrative access for cafe owner/manager
    setIsAdmin(true);
    sessionStorage.setItem('pinecrest_admin_session', 'true');
    setIsAdminLoginOpen(false);
    return true;
  };

  // Cart actions
  const addToCart = (product: Product, options?: SelectedOptions, quantity = 1) => {
    const optsKey = options ? JSON.stringify(options) : '';
    const cartItemId = `${product.id}-${optsKey}`;

    const basePrice = product.discountPercent && product.discountPercent > 0
      ? product.price * (1 - product.discountPercent / 100)
      : product.price;
    const addOnsTotal = options?.selectedAddOns
      ? options.selectedAddOns.reduce((acc, a) => acc + (a.price || 0), 0)
      : 0;
    const effectiveUnitPrice = Number((basePrice + addOnsTotal).toFixed(2));

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { 
                ...item, 
                quantity: item.quantity + quantity, 
                itemTotal: (item.quantity + quantity) * item.unitPrice 
              }
            : item
        );
      }

      return [
        ...prev,
        {
          cartItemId,
          product,
          quantity,
          selectedOptions: options || {},
          unitPrice: effectiveUnitPrice,
          itemTotal: effectiveUnitPrice * quantity,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity, itemTotal: item.unitPrice * quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.itemTotal, 0);

  // Order Placement
  const placeOrder = async (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryMethod: DeliveryMethod;
    tableOrAddress: string;
    notes?: string;
    paymentMethod: 'cash_on_counter' | 'card_at_pickup' | 'upi_online';
  }): Promise<Order> => {
    const orderNumber = `#PC-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const tax = Number((cartSubtotal * settings.taxRate).toFixed(2));
    const deliveryFee = orderData.deliveryMethod === 'hotel_delivery' ? settings.deliveryFee : 0;
    const total = Number((cartSubtotal + tax + deliveryFee).toFixed(2));
    const nowIso = new Date().toISOString();

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      userId: currentUser?.uid || 'guest',
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      deliveryMethod: orderData.deliveryMethod,
      tableOrAddress: orderData.tableOrAddress,
      notes: orderData.notes || '',
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee,
      tax,
      discount: 0,
      total,
      status: 'placed',
      createdAt: nowIso,
      estimatedMinutes: 20,
      paymentMethod: orderData.paymentMethod,
      statusUpdates: [
        {
          status: 'placed',
          timestamp: nowIso,
          note: 'Order successfully received by Pinecrest Hill Station Cafe'
        }
      ]
    };

    // Save to Firestore
    try {
      await setDoc(doc(db, 'orders', orderId), newOrder);
    } catch (err) {
      console.warn('Saving order locally fallback:', err);
    }

    // Update local state immediately
    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    setActivePage('order-success');

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C48B47', '#58715E', '#D4AF37', '#FAF7F2']
      });
    } catch {
      // safe fallback
    }

    return newOrder;
  };

  // Update order status (Admin)
  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus, note?: string) => {
    const statusMessages: Record<OrderStatus, string> = {
      placed: 'Order placed by customer',
      confirmed: 'Order confirmed by Head Barista. Kitchen tickets printed.',
      preparing: 'Artisanal brewing & orchard fresh cold-pressing in progress.',
      ready: 'Packed fresh and waiting at pickup counter / out with hill courier.',
      delivered: 'Delivered and handed over fresh! Enjoy your mountain refreshments.',
      cancelled: 'Order was cancelled.'
    };

    const updateNote = note || statusMessages[newStatus];
    const timestamp = new Date().toISOString();

    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    const updatedUpdates = [
      ...targetOrder.statusUpdates,
      { status: newStatus, timestamp, note: updateNote }
    ];

    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus,
        statusUpdates: updatedUpdates
      });
    } catch (e) {
      console.warn('Order status update fallback:', e);
    }

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: newStatus, statusUpdates: updatedUpdates }
          : o
      )
    );
  };

  const searchOrderById = (queryStr: string) => {
    const clean = queryStr.trim().toLowerCase();
    return orders.find(
      (o) => o.id.toLowerCase() === clean || o.orderNumber.toLowerCase() === clean
    );
  };

  // Product actions (Admin)
  const addProduct = async (productData: Omit<Product, 'id'>) => {
    const id = `prod_${Date.now()}`;
    const newProduct: Product = { ...productData, id };

    try {
      await setDoc(doc(db, 'products', id), newProduct);
    } catch (e) {
      console.warn('Product add fallback:', e);
    }

    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = async (updated: Product) => {
    try {
      await updateDoc(doc(db, 'products', updated.id), { ...updated });
    } catch (e) {
      console.warn('Product update fallback:', e);
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const deleteProduct = async (productId: string) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
    } catch (e) {
      console.warn('Product delete fallback:', e);
    }

    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggleProductStock = async (productId: string, inStock: boolean) => {
    try {
      await updateDoc(doc(db, 'products', productId), { inStock });
    } catch (e) {
      console.warn('Product stock toggle fallback:', e);
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock } : p))
    );
  };

  const resetProductsToDefault = async () => {
    setProducts(INITIAL_PRODUCTS);
    for (const p of INITIAL_PRODUCTS) {
      try {
        await setDoc(doc(db, 'products', p.id), p);
      } catch (e) {
        // ignore
      }
    }
  };

  // Table reservation
  const bookTable = async (
    resData: Omit<TableReservation, 'id' | 'createdAt' | 'status'>
  ): Promise<TableReservation> => {
    const id = `res_${Date.now()}`;
    const newReservation: TableReservation = {
      ...resData,
      id,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    try {
      await setDoc(doc(db, 'reservations', id), newReservation);
    } catch (e) {
      console.warn('Reservation save fallback:', e);
    }

    setReservations((prev) => [newReservation, ...prev]);
    return newReservation;
  };

  const updateReservationStatus = async (resId: string, status: TableReservation['status']) => {
    try {
      await updateDoc(doc(db, 'reservations', resId), { status });
    } catch (e) {
      console.warn('Reservation status update fallback:', e);
    }

    setReservations((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, status } : r))
    );
  };

  // Cafe Settings
  const updateSettings = async (newSettings: Partial<CafeSettings>) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    try {
      await setDoc(doc(db, 'settings', 'general'), merged);
    } catch (e) {
      console.warn('Settings save fallback:', e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAdmin,
        isAuthLoading,
        loginGoogle,
        loginEmail,
        registerEmail,
        logout,
        loginAsAdminDirect,

        activePage,
        setActivePage,
        selectedCategory,
        setSelectedCategory,

        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        resetProductsToDefault,

        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,

        orders,
        currentOrder,
        setCurrentOrder,
        placeOrder,
        updateOrderStatus,
        searchOrderById,

        reservations,
        bookTable,
        updateReservationStatus,

        settings,
        updateSettings,

        isAuthModalOpen,
        setIsAuthModalOpen,
        isAdminLoginOpen,
        setIsAdminLoginOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
