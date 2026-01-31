import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Country } from '../../entities/user.entity';

export class CreateRestaurantDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsEnum(Country)
  country: Country;

  @IsOptional()
  imageUrl?: string;
}
