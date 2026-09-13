export type ProductCategory = 'juice' | 'coffee' | 'tea' | 'bakery' | 'specials';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  inStock: boolean;
  isChefSpecial?: boolean;
  tags: string[];
  calories?: number;
  prepTimeMinutes: number;
  altitudeOrigin?: string;
  discountPercent?: number;
  extraAddOns?: { name: string; price: number }[];
  customizationOptions?: {
    sweetnessLevels?: string[];
    milkOptions?: string[];
    temperature?: string[];
    iceLevels?: string[];
  };
}

export interface SelectedOptions {
  sweetness?: string;
  milk?: string;
  temperature?: string;
  ice?: string;
  specialInstructions?: string;
  selectedAddOns?: { name: string; price: number }[];
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  selectedOptions: SelectedOptions;
  unitPrice: number;
  itemTotal: number;
}

export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export type DeliveryMethod = 'dine_in' | 'takeaway' | 'hotel_delivery';

export interface OrderUpdate {
  status: OrderStatus;
  timestamp: string;
  note: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryMethod: DeliveryMethod;
  tableOrAddress: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedMinutes: number;
  paymentMethod: 'cash_on_counter' | 'card_at_pickup' | 'upi_online';
  statusUpdates: OrderUpdate[];
}

export interface TableReservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableArea: 'Mountain View Balcony' | 'Pine Hearth Fireside' | 'Misty Garden Verandah';
  specialRequests?: string;
  createdAt: string;
  status: 'confirmed' | 'seated' | 'completed' | 'cancelled';
}

export interface CafeSettings {
  cafeName: string;
  tagline: string;
  announcement: string;
  isOpen: boolean;
  openingHours: string;
  phone: string;
  email: string;
  address: string;
  deliveryFee: number;
  taxRate: number;
  activePromoCode?: string;
  promoDiscountPercent?: number;
  specialOfferText?: string;
}
