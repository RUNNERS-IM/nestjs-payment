// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { UserEntity } from '../../user/entities/user.entity';

// Main section
export class UserDto extends PickType(PartialType(UserEntity), ['id', 'nemoId', 'role'] as const) {}
