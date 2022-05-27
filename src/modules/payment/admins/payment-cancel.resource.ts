// Third party
import dotenv from 'dotenv';

// Entity
import { PaymentCancelEntity } from '../entities/payment-cancel.entity';

// Option
import { paymentCancelResourceOptions } from './options/payment-cancel.resource.options';

// Main section
dotenv.config({ path: `.envs/.${process.env.ENVIRONMENT}/.env` });

export const paymentCancelResource = {
  resource: PaymentCancelEntity,
  options: paymentCancelResourceOptions,
};
