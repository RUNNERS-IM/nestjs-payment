// Entity
import { PaymentCancelEntity } from '../entities/payment-cancel.entity';

// Option
import { paymentCancelResourceOptions } from './options/payment-cancel.resource.options';

// Main section
export const paymentCancelResource = {
  resource: PaymentCancelEntity,
  options: paymentCancelResourceOptions,
};
