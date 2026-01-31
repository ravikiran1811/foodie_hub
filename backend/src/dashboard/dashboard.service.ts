import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { DashboardStatsResponse, RecentOrdersResponse } from './dto/dashboard.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async getDashboardStats(): Promise<DashboardStatsResponse> {
    // Get total restaurants
    const totalRestaurants = await this.restaurantRepository.count();

    // Get total orders
    const totalOrders = await this.orderRepository.count();

    // Get orders from last year
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const ordersLastYear = await this.orderRepository.count({
      where: {
        createdAt: MoreThan(oneYearAgo),
      },
    });

    // Get orders from today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const ordersToday = await this.orderRepository.count({
      where: {
        createdAt: MoreThan(startOfDay),
      },
    });

    // Get total users
    const totalUsers = await this.userRepository.count();

    // Get total roles
    const totalRoles = await this.roleRepository.count();

    // Get active restaurants (you can add isActive field to restaurant entity)
    const activeRestaurants = await this.restaurantRepository.count();

    // Calculate total revenue (sum of all order totals)
    const ordersWithTotals = await this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.totalAmount)', 'totalRevenue')
      .getRawOne();

    const totalRevenue = ordersWithTotals?.totalRevenue || 0;

    return {
      totalRestaurants,
      totalOrders,
      ordersLastYear,
      ordersToday,
      totalUsers,
      totalRoles,
      activeRestaurants,
      totalRevenue: `$${parseFloat(totalRevenue).toFixed(2)}`,
    };
  }

  async getRecentOrders(limit: number = 10): Promise<RecentOrdersResponse[]> {
    const orders = await this.orderRepository.find({
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
      take: limit,
    });

    return orders.map(order => ({
      id: order.id,
      orderNumber: `#FR${order.id.toString().padStart(6, '0')}`,
      customerName: order.user?.name || 'Unknown',
      status: order.status,
      total: `$${parseFloat(order.totalAmount.toString()).toFixed(2)}`,
      createdAt: order.createdAt,
    }));
  }
}
