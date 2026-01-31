import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/gql-auth.guard';
import { DashboardStatsResponse, RecentOrdersResponse } from './dto/dashboard.dto';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  async getStats(): Promise<DashboardStatsResponse> {
    return this.dashboardService.getDashboardStats();
  }

  @Get('recent-orders')
  async getRecentOrders(
    @Query('limit') limit?: string,
  ): Promise<RecentOrdersResponse[]> {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.dashboardService.getRecentOrders(limitNum);
  }
}
