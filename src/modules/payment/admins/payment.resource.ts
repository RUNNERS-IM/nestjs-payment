// Third party
import dotenv from 'dotenv';

// Entity
import { PaymentEntity } from '../entities/payment.entity';

// Option
import { paymentResourceOptions } from './options/payment.resource.options';

// Main section
dotenv.config({ path: `.envs/.${process.env.ENVIRONMENT}/.env` });

export const paymentResource = {
  resource: PaymentEntity,
  options: paymentResourceOptions,
};
