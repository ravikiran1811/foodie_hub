import { IsNotEmpty, IsNumber, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  menuItemId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsOptional()
  deliveryAddress?: string;

  @IsOptional()
  specialInstructions?: string;
}

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  status: string;
}
