import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { RoleAclCategoryActionMap } from './role-acl-category-action-map.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @OneToMany(() => User, user => user.role)
  users: User[];

  @OneToMany(() => RoleAclCategoryActionMap, map => map.role)
  permissions: RoleAclCategoryActionMap[];

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
    description: string,
    createdBy: string,
    updatedBy: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
