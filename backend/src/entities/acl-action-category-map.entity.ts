import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { AclCategory } from './acl-category.entity';
import { AclAction } from './acl-action.entity';

@Entity('acl_action_category_map')
@Index(['categoryId', 'actionId'], { unique: true })
export class AclActionCategoryMap {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'category_id', type: 'int', nullable: false })
  categoryId: number;

  @Column({ name: 'action_id', type: 'int', nullable: false })
  actionId: number;

  @ManyToOne(() => AclCategory, category => category.actionMaps, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: AclCategory;

  @ManyToOne(() => AclAction, action => action.categoryMaps, { onDelete: 'CASCADE' })
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
    categoryId: number,
    actionId: number,
    createdBy: string,
    updatedBy: string,
  ) {
    this.id = id;
    this.categoryId = categoryId;
    this.actionId = actionId;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
