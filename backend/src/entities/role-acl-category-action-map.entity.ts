import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { Role } from './role.entity';
import { AclCategory } from './acl-category.entity';
import { AclAction } from './acl-action.entity';

@Entity('role_acl_category_action_map')
@Index(['roleId', 'categoryId', 'actionId'], { unique: true })
export class RoleAclCategoryActionMap {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'role_id', type: 'int', nullable: false })
  roleId: number;

  @Column({ name: 'category_id', type: 'int', nullable: false })
  categoryId: number;

  @Column({ name: 'action_id', type: 'int', nullable: false })
  actionId: number;

  @Column({ name: 'is_allowed', type: 'boolean', default: false })
  isAllowed: boolean;

  @ManyToOne(() => Role, role => role.permissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => AclCategory, category => category.rolePermissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: AclCategory;

  @ManyToOne(() => AclAction, action => action.rolePermissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'action_id' })
  action: AclAction;

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
    roleId: number,
    categoryId: number,
    actionId: number,
    isAllowed: boolean,
    createdBy: string,
    updatedBy: string,
  ) {
    this.id = id;
    this.roleId = roleId;
    this.categoryId = categoryId;
    this.actionId = actionId;
    this.isAllowed = isAllowed;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
