import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from './role.entity';
import { Order } from './order.entity';
import { PaymentMethod } from './payment-method.entity';

export enum Country {
  INDIA = 'INDIA',
  AMERICA = 'AMERICA',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ name: 'role_id', type: 'int', nullable: false })
  roleId: number;

  @Column({
    name: 'country',
    type: 'enum',
    enum: Country,
    default: Country.INDIA,
  })
  country: Country;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @OneToMany(() => PaymentMethod, paymentMethod => paymentMethod.user)
  paymentMethods: PaymentMethod[];

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
    name: string,
    email: string,
    password: string,
    roleId: number,
    country: Country,
    createdBy: string,
    updatedBy: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
    this.country = country;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
