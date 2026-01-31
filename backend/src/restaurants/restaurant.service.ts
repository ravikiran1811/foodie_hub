import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { MenuItem } from '../entities/menu-item.entity';
import { Country } from '../entities/user.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepo: Repository<Restaurant>,
    @InjectRepository(MenuItem)
    private menuItemRepo: Repository<MenuItem>,
  ) {}

  async findAll(country?: Country): Promise<Restaurant[]> {
    try{
  console.log('Finding restaurants for country:', country);
    const query = this.restaurantRepo
      .createQueryBuilder('restaurant')
      .where('restaurant.isActive = :isActive', { isActive: true });

    if (country) {
      query.andWhere('restaurant.country = :country', { country });
    }

    return query.getMany();
    }
  catch(err){
    console.error('Error fetching restaurants:', err);
    throw err;
  }
  }

  async findOne(id: number): Promise<Restaurant> {
    try {
      const restaurant = await this.restaurantRepo.findOne({
        where: { id },
        relations: ['menuItems'],
      });

      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }

      return restaurant;
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to fetch restaurant. Please try again.');
    }
  }

  async getMenuItems(restaurantId: number): Promise<MenuItem[]> {
    try {
      const restaurant = await this.restaurantRepo.findOne({
        where: { id: restaurantId },
      });

      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }

      return await this.menuItemRepo.find({
        where: { restaurantId, isAvailable: true },
      });
    } catch (error) {
      console.error('Error fetching menu items:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to fetch menu items. Please try again.');
    }
  }
}
