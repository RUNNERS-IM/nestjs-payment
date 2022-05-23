// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { UserEntity } from '../../user/entities/user.entity';

// Main section
export class UserRegisterDto extends PickType(PartialType(UserEntity), ['nemoId'] as const) {}
