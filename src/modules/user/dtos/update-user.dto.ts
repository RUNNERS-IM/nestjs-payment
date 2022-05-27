// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { UserEntity } from '../../user/entities/user.entity';

// Main section
export class UpdateUserDto extends PickType(PartialType(UserEntity), [
  'name',
  'phone',
  'email',
  'address',
  'postcode',
] as const) {}
