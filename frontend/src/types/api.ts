export interface User {
  id: number;
  name: string;
  email: string;
  roleId: number;
  country: string;
}

export interface DashboardStats {
  totalRestaurants: number;
  totalOrders: number;
  ordersLastYear: number;
  ordersToday: number;
  totalUsers: number;
  totalRoles: number;
  activeRestaurants: number;
  totalRevenue: string;
}

export interface RecentOrder {
  id: number;
  orderNumber: string;
  customerName: string;
  status: string;
  total: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  roleName: string;
  country?: string;
}

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  country: string;
  imageUrl: string;
  isActive: boolean;
}

export interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isAvailable: boolean;
}

export interface OrderItem {
  menuItemId: number;
  quantity: number;
  price: number;
  menuItem?: MenuItem;
}

export interface Order {
  id: number;
  userId: number;
  restaurantId: number;
  status: string;
  totalAmount: number;
  deliveryAddress?: string;
  specialInstructions?: string;
  items: OrderItem[];
  restaurant?: Restaurant;
  createdAt: string;
}

export interface CreateOrderRequest {
  restaurantId: number;
  items: OrderItem[];
  deliveryAddress?: string;
  specialInstructions?: string;
}

export interface PaymentMethod {
  id: number;
  userId: number;
  type: string;
  label: string;
  last4Digits: string;
  isActive: boolean;
}

export interface CreatePaymentMethodRequest {
  type: string;
  label: string;
  last4Digits: string;
}
