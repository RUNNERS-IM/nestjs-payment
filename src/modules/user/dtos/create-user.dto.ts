// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { UserEntity } from '../entities/user.entity';

// Main section
export class CreateUserDto extends PickType(PartialType(UserEntity), [
  'key',
  'name',
  'phone',
  'email',
  'address',
  'postcode',
] as const) {}
