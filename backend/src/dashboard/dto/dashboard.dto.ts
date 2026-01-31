export class DashboardStatsResponse {
  totalRestaurants: number;
  totalOrders: number;
  ordersLastYear: number;
  ordersToday: number;
  totalUsers: number;
  totalRoles: number;
  activeRestaurants: number;
  totalRevenue: string;
}

export class RecentOrdersResponse {
  id: number;
  orderNumber: string;
  customerName: string;
  status: string;
  total: string;
  createdAt: Date;
}
