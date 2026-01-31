import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

export enum PaymentMethodType {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  UPI = 'UPI',
  NET_BANKING = 'NET_BANKING',
  WALLET = 'WALLET',
}

@Entity('payment_methods')
export class PaymentMethod {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'user_id', type: 'int', nullable: false })
  userId: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: PaymentMethodType,
  })
  type: PaymentMethodType;

  @Column({ name: 'label', type: 'varchar', length: 255, nullable: false })
  label: string;

  @Column({ name: 'last_4_digits', type: 'varchar', length: 4, nullable: false })
  last4Digits: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => User, user => user.paymentMethods)
  @JoinColumn({ name: 'user_id' })
  user: User;

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
    type: PaymentMethodType,
    label: string,
    last4Digits: string,
    isActive: boolean,
    createdBy: string,
    updatedBy: string,
  ) {
    this.id = id;
    this.userId = userId;
    this.type = type;
    this.label = label;
    this.last4Digits = last4Digits;
    this.isActive = isActive;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
