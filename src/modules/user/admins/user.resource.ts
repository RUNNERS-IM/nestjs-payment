// Entity
import { UserEntity } from '../entities/user.entity';

// Option
import { userResourceOptions } from './options/user.resource.options';

// Main section
export const userResource = {
  resource: UserEntity,
  options: userResourceOptions,
};
