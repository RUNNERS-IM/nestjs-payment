// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { PaymentPrepareEntity } from '../entities/payment-prepare.entity';

// Main section
export class CreatePaymentPrepareDto extends PickType(PartialType(PaymentPrepareEntity), [
  'sellerId',
  'productId',
  'amount',
] as const) {}
