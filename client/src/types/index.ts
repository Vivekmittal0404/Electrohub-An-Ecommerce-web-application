export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
}

export interface Product {
  _id?: string;
  id?: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand?: string;
  description?: string;
  images?: string[];
  rating?: number;
  stock?: number;
  numReviews?: number;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  phone?: string;
  address?: Record<string, string>;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  status: string;
  createdAt?: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  token: string;
}
