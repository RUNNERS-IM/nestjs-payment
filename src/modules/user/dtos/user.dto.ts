// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { UserEntity } from '../entities/user.entity';

// Main section
export class UserDto extends PickType(PartialType(UserEntity), [
  'id',
  'key',
  'name',
  'phone',
  'email',
  'address',
  'postcode',
] as const) {
  constructor(user: UserEntity) {
    super();
    this.id = user.id;
    this.key = user.key;
    this.name = user.name;
    this.phone = user.phone;
    this.email = user.email;
    this.address = user.address;
    this.postcode = user.postcode;
  }
}
