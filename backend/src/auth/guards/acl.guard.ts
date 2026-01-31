import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleAclCategoryActionMap } from '../../entities/role-acl-category-action-map.entity';

export interface AclRequirement {
  category: string;
  action: string;
}

export const ACL_KEY = 'acl_requirement';

@Injectable()
export class AclGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(RoleAclCategoryActionMap)
    private rolePermissionRepo: Repository<RoleAclCategoryActionMap>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const aclRequirement = this.reflector.get<AclRequirement>(
      ACL_KEY,
      context.getHandler(),
    );

    if (!aclRequirement) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roleId) {
      throw new ForbiddenException('User not authenticated');
    }
    console.log('Checking ACL for user:', user);
    console.log('Required ACL:', aclRequirement);
    console.log('User Role ID:', user.roleId);
    console.log(aclRequirement.category, aclRequirement.action);
    const hasPermission = await this.rolePermissionRepo
      .createQueryBuilder('perm')
      .innerJoin('perm.category', 'category')
      .innerJoin('perm.action', 'action')
      .where('perm.roleId = :roleId', { roleId: user.roleId })
      .andWhere('category.categoryKey = :categoryKey', {
        categoryKey: aclRequirement.category,
      })
      .andWhere('action.actionKey = :actionKey', {
        actionKey: aclRequirement.action,
      })
      .andWhere('perm.isAllowed = :isAllowed', { isAllowed: true })
      .getOne();

    if (!hasPermission) {
      throw new ForbiddenException(
        `Access denied. Required permission: ${aclRequirement.category}:${aclRequirement.action}`,
      );
    }

    return true;
  }
}
