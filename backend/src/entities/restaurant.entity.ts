import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MenuItem } from './menu-item.entity';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'address', type: 'text', nullable: false })
  address: string;

  @Column({
    name: 'country',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  country: string;

  @Column({ name: 'image_url', type: 'varchar', length: 500, nullable: true })
  imageUrl: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => MenuItem, menuItem => menuItem.restaurant)
  menuItems: MenuItem[];

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

  constructor(
    id: number,
    name: string,
    description: string,
    address: string,
    country: string,
    imageUrl: string,
    isActive: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.address = address;
    this.country = country;
    this.imageUrl = imageUrl;
    this.isActive = isActive;
  }
}
