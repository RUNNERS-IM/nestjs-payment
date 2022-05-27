// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { PaymentEntity } from '../entities/payment.entity';

// Main section
export class CreatePaymentDto extends PickType(PartialType(PaymentEntity), [
  'paymentPrepareId',
  'impUid',
] as const) {}
