// Third party
import dotenv from 'dotenv';

// Entity
import { PaymentPrepareEntity } from '../entities/payment-prepare.entity';

// Option
import { paymentPrepareResourceOptions } from './options/payment-prepare.resource.options';

// Main section
dotenv.config({ path: `.envs/.${process.env.ENVIRONMENT}/.env` });

export const paymentPrepareResource = {
  resource: PaymentPrepareEntity,
  options: paymentPrepareResourceOptions,
};
