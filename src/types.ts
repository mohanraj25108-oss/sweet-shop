export interface Product {
  id: string;
  name: string;
  category: 'Sweets' | 'Namkeens' | 'Snacks' | 'Bakery' | 'Chocolates' | 'Gifting' | 'Fragrances' | 'Ice Cream' | 'Tea';
  subcategory: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  isVeg: boolean;
  tag?: string;
  description: string;
  weightOptions: { label: string; price: number }[];
  ingredients?: string[];
  shelfLifeDays?: number;
  inStock: boolean;
  isCustomBoxEligible?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedWeight: string;
  price: number;
  quantity: number;
}

export interface CustomBoxSlot {
  index: number;
  sweet: Product | null;
  approxWeightGrams: number;
}

export interface CustomBox {
  id: string;
  name: string;
  boxType: '4-Slot Heritage (500g)' | '6-Slot Royal (750g)' | '9-Slot Imperial (1kg)';
  boxStyle: string;
  slots: CustomBoxSlot[];
  totalPrice: number;
  giftRibbon: boolean;
  giftMessage?: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  landmark: string;
  address: string;
  pincode: string;
  timings: string;
  phone: string;
  distance: string;
  isOpen: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  deliveryAddress: string;
  storeLocation: string;
  deliverySlot: string;
  items: CartItem[];
  customBoxes?: CustomBox[];
  totalAmount: number;
  status: 'Received' | 'Kitchen Prep' | 'Quality Check' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
  paymentMethod: string;
}

