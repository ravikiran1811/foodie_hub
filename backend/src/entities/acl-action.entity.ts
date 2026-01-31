import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AclActionCategoryMap } from './acl-action-category-map.entity';
import { RoleAclCategoryActionMap } from './role-acl-category-action-map.entity';

@Entity('acl_actions')
export class AclAction {
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

  @Column({ name: 'action_key', type: 'varchar', length: 50, unique: true })
  actionKey: string;

  @OneToMany(() => AclActionCategoryMap, map => map.action)
  categoryMaps: AclActionCategoryMap[];

  @OneToMany(() => RoleAclCategoryActionMap, map => map.action)
  rolePermissions: RoleAclCategoryActionMap[];

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
    actionKey: string,
    createdBy: string,
    updatedBy: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.actionKey = actionKey;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
