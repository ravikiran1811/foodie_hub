import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { JwtAuthGuard } from '../auth/guards/gql-auth.guard';
import { RequireAcl, RequireCountryAccess } from '../auth/decorators/acl.decorator';
import { AclGuard } from '../auth/guards/acl.guard';
import { CountryAccessGuard } from '../auth/guards/country-access.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Country } from '../entities/user.entity';

@Controller('restaurants')
@UseGuards(JwtAuthGuard, AclGuard, CountryAccessGuard)
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  @RequireAcl('RESTAURANTS', 'READ_001')
  @RequireCountryAccess()
  async findAll(@CurrentUser() user: any) {
    return this.restaurantService.findAll(user.country as Country);
  }

  @Get(':id')
  @RequireAcl('RESTAURANTS', 'READ_001')
  async findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(parseInt(id));
  }

  @Get(':id/menu')
  @RequireAcl('RESTAURANTS', 'READ_001')
  async getMenu(@Param('id') id: string) {
    return this.restaurantService.getMenuItems(parseInt(id));
  }
}
