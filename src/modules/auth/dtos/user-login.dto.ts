// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { UserEntity } from '../../user/entities/user.entity';

// Main section
export class UserLoginDto extends PickType(PartialType(UserEntity), ['id'] as const) {}
