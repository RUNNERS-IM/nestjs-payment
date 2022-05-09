import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Allow } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { RoleType } from '../../../constants';
import { IsPhoneNumber } from '../../../decorators';
import type { UserEntity } from '../user.entity';

// TODO, remove this class and use constructor's second argument's type
export type UserDtoOptions = Partial<{ isActive: boolean }>;

export class UserDto extends AbstractDto {
  @Allow()
  @ApiPropertyOptional()
  firstName?: string;

  @Allow()
  @ApiPropertyOptional()
  lastName?: string;

  @Allow()
  @ApiProperty()
  username: string;

  @Allow()
  @ApiPropertyOptional({ enum: RoleType, enumName: 'RoleType' })
  role?: RoleType;

  @Allow()
  @ApiPropertyOptional()
  email?: string;

  @Allow()
  @ApiPropertyOptional()
  avatar?: string;

  @Allow()
  @ApiPropertyOptional()
  @IsPhoneNumber({ region: 'KR' })
  phone?: string;

  @Allow()
  @ApiPropertyOptional()
  isActive?: boolean;

  constructor(user: UserEntity, options?: UserDtoOptions) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.email = user.email;
    this.avatar = user.avatar;
    this.phone = user.phone;
    this.isActive = options?.isActive;
  }
}
