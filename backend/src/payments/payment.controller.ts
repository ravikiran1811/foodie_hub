import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentMethodDto } from './dto/payment.dto';
import { JwtAuthGuard } from '../auth/guards/gql-auth.guard';
import { AclGuard } from '../auth/guards/acl.guard';
import { RequireAcl } from '../auth/decorators/acl.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('payments')
@UseGuards(JwtAuthGuard, AclGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('methods')
  @RequireAcl('PAYMENTS', 'WRITE_001')
  async create(@CurrentUser() user: any, @Body() createPaymentDto: CreatePaymentMethodDto) {
    return this.paymentService.create(user.sub, createPaymentDto);
  }

  @Get('methods')
  @RequireAcl('PAYMENTS', 'READ_001')
  async findAll(@CurrentUser() user: any) {
    return this.paymentService.findAll(user.sub);
  }

  @Delete('methods/:id')
  @RequireAcl('PAYMENTS', 'DELETE_001')
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    await this.paymentService.remove(parseInt(id), user.sub);
    return { message: 'Payment method deleted successfully' };
  }
}
