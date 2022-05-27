// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { PaymentEntity } from '../entities/payment.entity';

// Main section
export class CreateCardPaymentDto extends PickType(PartialType(PaymentEntity), [
  'sellerId',
  'cardId',
  'paymentPrepareId',
] as const) {}
