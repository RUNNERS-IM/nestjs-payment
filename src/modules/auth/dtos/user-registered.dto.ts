// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { UserEntity } from '../../user/entities/user.entity';

// Main section
export class UserRegisteredDto extends PickType(PartialType(UserEntity), ['id'] as const) {
  constructor(user: UserEntity) {
    super();
    this.id = user.id;
  }
}
