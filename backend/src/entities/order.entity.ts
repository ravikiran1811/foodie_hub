import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Restaurant } from './restaurant.entity';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'user_id', type: 'int', nullable: false })
  userId: number;

  @Column({ name: 'restaurant_id', type: 'int', nullable: false })
  restaurantId: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ name: 'delivery_address', type: 'text', nullable: true })
  deliveryAddress: string;

  @Column({ name: 'special_instructions', type: 'text', nullable: true })
  specialInstructions: string;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  items: OrderItem[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updatedAt: Date;

  @Column({ name: 'created_by', type: 'varchar', length: 255, nullable: false })
  createdBy: string;

  @Column({ name: 'updated_by', type: 'varchar', length: 255, nullable: false })
  updatedBy: string;

  constructor(
    id: number,
    userId: number,
    restaurantId: number,
    status: OrderStatus,
    totalAmount: number,
    deliveryAddress: string,
    specialInstructions: string,
    createdBy: string,
    updatedBy: string,
  ) {
    this.id = id;
    this.userId = userId;
    this.restaurantId = restaurantId;
    this.status = status;
    this.totalAmount = totalAmount;
    this.deliveryAddress = deliveryAddress;
    this.specialInstructions = specialInstructions;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
