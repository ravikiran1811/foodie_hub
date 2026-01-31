import { IsNotEmpty, IsEnum } from 'class-validator';
import { PaymentMethodType } from '../../entities/payment-method.entity';

export class CreatePaymentMethodDto {
  @IsNotEmpty()
  @IsEnum(PaymentMethodType)
  type: PaymentMethodType;

  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  last4Digits: string;
}
