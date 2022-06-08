// Entity
import { PaymentEntity } from '../entities/payment.entity';

// Option
import { paymentResourceOptions } from './options/payment.resource.options';

// Main section
export const paymentResource = {
  resource: PaymentEntity,
  options: paymentResourceOptions,
};
