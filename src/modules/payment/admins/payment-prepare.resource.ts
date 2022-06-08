// Entity
import { PaymentPrepareEntity } from '../entities/payment-prepare.entity';

// Option
import { paymentPrepareResourceOptions } from './options/payment-prepare.resource.options';

// Main section
export const paymentPrepareResource = {
  resource: PaymentPrepareEntity,
  options: paymentPrepareResourceOptions,
};
