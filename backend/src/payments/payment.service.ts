import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod } from '../entities/payment-method.entity';
import { User } from '../entities/user.entity';
import { CreatePaymentMethodDto } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodRepo: Repository<PaymentMethod>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(userId: number, createPaymentDto: CreatePaymentMethodDto): Promise<PaymentMethod> {
    try {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const paymentMethod = this.paymentMethodRepo.create({
        userId,
        type: createPaymentDto.type,
        label: createPaymentDto.label,
        last4Digits: createPaymentDto.last4Digits,
        isActive: true,
        createdBy: user.email,
        updatedBy: user.email,
      });

      return await this.paymentMethodRepo.save(paymentMethod);
    } catch (error) {
      console.error('Error creating payment method:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to create payment method. Please try again.');
    }
  }

  async findAll(userId: number): Promise<PaymentMethod[]> {
    try {
      return await this.paymentMethodRepo.find({
        where: { userId, isActive: true },
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      throw new Error('Failed to fetch payment methods. Please try again.');
    }
  }

  async remove(id: number, userId: number): Promise<void> {
    try {
      const paymentMethod = await this.paymentMethodRepo.findOne({
        where: { id, userId },
      });

      if (!paymentMethod) {
        throw new NotFoundException('Payment method not found');
      }

      paymentMethod.isActive = false;
      await this.paymentMethodRepo.save(paymentMethod);
    } catch (error) {
      console.error('Error removing payment method:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to remove payment method. Please try again.');
    }
  }
}
