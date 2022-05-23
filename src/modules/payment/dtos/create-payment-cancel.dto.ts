// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { PaymentCancelEntity } from '../entities/payment-cancel.entity';

// Main section
export class CreatePaymentCancelDto extends PickType(PartialType(PaymentCancelEntity), [
  'paymentId',
  'amount',
] as const) {}
