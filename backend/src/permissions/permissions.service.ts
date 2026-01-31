import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { RoleAclCategoryActionMap } from '../entities/role-acl-category-action-map.entity';
import { AclCategory } from '../entities/acl-category.entity';
import { AclAction } from '../entities/acl-action.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(RoleAclCategoryActionMap)
    private readonly rolePermissionRepo: Repository<RoleAclCategoryActionMap>,
    @InjectRepository(AclCategory)
    private readonly categoryRepo: Repository<AclCategory>,
    @InjectRepository(AclAction)
    private readonly actionRepo: Repository<AclAction>,
  ) {}

  async getAllRoles() {
    try {
      const roles = await this.roleRepo.find({
        order: { id: 'ASC' },
      });
      return roles;
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  }

  async getRolePermissions(roleId: number) {
    try {
      const role = await this.roleRepo.findOne({ where: { id: roleId } });
      if (!role) {
        throw new NotFoundException(`Role with ID ${roleId} not found`);
      }

      // Get all permissions for this role
      const permissions = await this.rolePermissionRepo.find({
        where: { roleId: roleId },
        relations: ['category', 'action'],
      });

      // Get all categories and actions
      const categories = await this.categoryRepo.find({ order: { name: 'ASC' } });
      const actions = await this.actionRepo.find({ order: { actionKey: 'ASC' } });

      // Build permission map
      const permissionMap: Record<string, Record<string, boolean>> = {};

      categories.forEach((category) => {
        permissionMap[category.name] = {};
        actions.forEach((action) => {
          const hasPermission = permissions.some(
            (p) => p.categoryId === category.id && p.actionId === action.id,
          );
          permissionMap[category.name][action.actionKey] = hasPermission;
        });
      });

      return {
        role,
        permissions: permissionMap,
        categories: categories.map((c) => ({ id: c.id, name: c.name })),
        actions: actions.map((a) => ({ id: a.id, actionKey: a.actionKey })),
      };
    } catch (error) {
      console.error('Error fetching role permissions:', error);
      throw error;
    }
  }

  async updateRolePermissions(
    roleId: number,
    permissions: { categoryId: number; actionId: number }[],
    userId: number,
  ) {
    try {
      const role = await this.roleRepo.findOne({ where: { id: roleId } });
      if (!role) {
        throw new NotFoundException(`Role with ID ${roleId} not found`);
      }

      // Delete all existing permissions for this role
      await this.rolePermissionRepo.delete({ roleId: roleId });

      // Add new permissions
      const newPermissions = permissions.map((perm) => {
        const permission = this.rolePermissionRepo.create({
          roleId: roleId,
          categoryId: perm.categoryId,
          actionId: perm.actionId,
          isAllowed: true,
          createdBy: userId.toString(),
          updatedBy: userId.toString(),
        });
        return permission;
      });

      await this.rolePermissionRepo.save(newPermissions);

      return {
        message: 'Permissions updated successfully',
        count: newPermissions.length,
      };
    } catch (error) {
      console.error('Error updating role permissions:', error);
      throw error;
    }
  }

  async addPermission(roleId: number, categoryId: number, actionId: number, userId: number) {
    try {
      // Check if permission already exists
      const existing = await this.rolePermissionRepo.findOne({
        where: {
          roleId: roleId,
          categoryId: categoryId,
          actionId: actionId,
        },
      });

      if (existing) {
        return { message: 'Permission already exists' };
      }

      const permission = this.rolePermissionRepo.create({
        roleId: roleId,
        categoryId: categoryId,
        actionId: actionId,
        isAllowed: true,
        createdBy: userId.toString(),
        updatedBy: userId.toString(),
      });

      await this.rolePermissionRepo.save(permission);

      return { message: 'Permission added successfully' };
    } catch (error) {
      console.error('Error adding permission:', error);
      throw error;
    }
  }

  async removePermission(roleId: number, categoryId: number, actionId: number) {
    try {
      const result = await this.rolePermissionRepo.delete({
        roleId: roleId,
        categoryId: categoryId,
        actionId: actionId,
      });

      if (result.affected === 0) {
        throw new NotFoundException('Permission not found');
      }

      return { message: 'Permission removed successfully' };
    } catch (error) {
      console.error('Error removing permission:', error);
      throw error;
    }
  }

  async getCategoriesAndActions() {
    try {
      const categories = await this.categoryRepo.find({ order: { name: 'ASC' } });
      const actions = await this.actionRepo.find({ order: { actionKey: 'ASC' } });

      return {
        categories: categories.map((c) => ({ id: c.id, name: c.name })),
        actions: actions.map((a) => ({ id: a.id, actionKey: a.actionKey })),
      };
    } catch (error) {
      console.error('Error fetching categories and actions:', error);
      throw error;
    }
  }
}
