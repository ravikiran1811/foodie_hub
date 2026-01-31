import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { JwtAuthGuard } from '../auth/guards/gql-auth.guard';
import { AclGuard } from '../auth/guards/acl.guard';
import { RequireAcl } from '../auth/decorators/acl.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard, AclGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @RequireAcl('ORDERS', 'WRITE_001')
  async create(@CurrentUser() user: any, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(user.sub, createOrderDto);
  }

  @Get()
  @RequireAcl('ORDERS', 'READ_001')
  async findAll(@CurrentUser() user: any) {
    // Check if user has permission to view all orders (EXPORT_001 = admin)
    const canViewAll = user.permissions?.ORDERS?.EXPORT_001 === true;
    return this.orderService.findAll(user.sub, canViewAll);
  }

  @Get(':id')
  @RequireAcl('ORDERS', 'READ_001')
  async findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.orderService.findOne(parseInt(id), user.sub);
  }

  @Put(':id/status')
  @RequireAcl('ORDERS', 'UPDATE_001')
  async updateStatus(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateStatus(parseInt(id), user.sub, updateOrderStatusDto);
  }

  @Delete(':id')
  @RequireAcl('ORDERS', 'DELETE_001')
  async cancel(@Param('id') id: string, @CurrentUser() user: any) {
    return this.orderService.cancel(parseInt(id), user.sub);
  }
}
