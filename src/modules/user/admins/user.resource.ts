// Third party
import dotenv from 'dotenv';

// Entity
import { UserEntity } from '../entities/user.entity';

// Option
import { userResourceOptions } from './options/user.resource.options';

// Main section
dotenv.config({ path: `.envs/.${process.env.ENVIRONMENT}/.env` });

export const userResource = {
  resource: UserEntity,
  options: userResourceOptions,
};
