// Third party
import dotenv from 'dotenv';

// Entity
// Option
import { cardResourceOptions } from './options/card.resource.options';
import { CardEntity } from '../entities/card.entity';

// Main section
dotenv.config({ path: `.envs/.${process.env.ENVIRONMENT}/.env` });

export const cardResource = {
  resource: CardEntity,
  options: cardResourceOptions,
};
