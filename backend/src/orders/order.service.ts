import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { User } from '../entities/user.entity';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const totalAmount = createOrderDto.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      const order = this.orderRepo.create({
        userId,
        restaurantId: createOrderDto.restaurantId,
        totalAmount,
        deliveryAddress: createOrderDto.deliveryAddress,
        specialInstructions: createOrderDto.specialInstructions,
        status: OrderStatus.PENDING,
        createdBy: user.email,
        updatedBy: user.email,
      });

      const savedOrder = await this.orderRepo.save(order);

      const orderItems = createOrderDto.items.map((item) =>
        this.orderItemRepo.create({
          orderId: savedOrder.id,
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
        }),
      );

      await this.orderItemRepo.save(orderItems);

      return this.orderRepo.findOne({
        where: { id: savedOrder.id },
        relations: ['items', 'items.menuItem', 'restaurant'],
      });
    } catch (error) {
      console.error('Error creating order:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to create order. Please try again.');
    }
  }

  async findAll(userId: number, viewAll: boolean = false): Promise<Order[]> {
    try {
      const whereCondition = viewAll ? {} : { userId };
      return await this.orderRepo.find({
        where: whereCondition,
        relations: ['items', 'items.menuItem', 'restaurant', 'user'],
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders. Please try again.');
    }
  }

  async findOne(id: number, userId: number): Promise<Order> {
    try {
      const order = await this.orderRepo.findOne({
        where: { id },
        relations: ['items', 'items.menuItem', 'restaurant', 'user'],
      });

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      if (order.userId !== userId) {
        throw new ForbiddenException('You can only view your own orders');
      }

      return order;
    } catch (error) {
      console.error('Error fetching order:', error);
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new Error('Failed to fetch order. Please try again.');
    }
  }

  async updateStatus(
    id: number,
    userId: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const user = await this.userRepo.findOne({ where: { id: userId } });

    order.status = updateOrderStatusDto.status as OrderStatus;
    order.updatedBy = user.email;

    return this.orderRepo.save(order);
  }

  async cancel(id: number, userId: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status === OrderStatus.DELIVERED) {
      throw new ForbiddenException('Cannot cancel delivered order');
    }

    if (order.status === OrderStatus.CANCELLED) {
      throw new ForbiddenException('Order already cancelled');
    }

    const user = await this.userRepo.findOne({ where: { id: userId } });

    order.status = OrderStatus.CANCELLED;
    order.updatedBy = user.email;

    return this.orderRepo.save(order);
  }
}
