import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/gql-auth.guard';
import { PermissionsService } from './permissions.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('permissions')
@UseGuards(JwtAuthGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // Get all roles
  @Get('roles')
  async getRoles() {
    return this.permissionsService.getAllRoles();
  }

  // Get permissions for a specific role
  @Get('role/:roleId')
  async getRolePermissions(@Param('roleId') roleId: string) {
    return this.permissionsService.getRolePermissions(Number.parseInt(roleId));
  }

  // Update permissions for a role
  @Put('role/:roleId')
  async updateRolePermissions(
    @Param('roleId') roleId: string,
    @Body() body: { permissions: { categoryId: number; actionId: number }[] },
    @CurrentUser() user: any,
  ) {
    return this.permissionsService.updateRolePermissions(
      Number.parseInt(roleId),
      body.permissions,
      user.sub,
    );
  }

  // Add a single permission
  @Post('add')
  async addPermission(
    @Body() body: { roleId: number; categoryId: number; actionId: number },
    @CurrentUser() user: any,
  ) {
    return this.permissionsService.addPermission(
      body.roleId,
      body.categoryId,
      body.actionId,
      user.sub,
    );
  }

  // Remove a single permission
  @Delete('remove')
  async removePermission(
    @Body() body: { roleId: number; categoryId: number; actionId: number },
    @CurrentUser() user: any,
  ) {
    return this.permissionsService.removePermission(
      body.roleId,
      body.categoryId,
      body.actionId,
    );
  }

  // Get all categories and actions
  @Get('categories-actions')
  async getCategoriesAndActions() {
    return this.permissionsService.getCategoriesAndActions();
  }
}
