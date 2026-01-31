import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { Role } from '../entities/role.entity';
import { RoleAclCategoryActionMap } from '../entities/role-acl-category-action-map.entity';
import { AclCategory } from '../entities/acl-category.entity';
import { AclAction } from '../entities/acl-action.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Role,
      RoleAclCategoryActionMap,
      AclCategory,
      AclAction,
    ]),
    AuthModule,
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
