// Constant
import { ApiProperty } from '@nestjs/swagger';

// Dto

// Entity
import { UserEntity } from '../entities/user.entity';
import { TokenDto } from '../../auth/dtos/token.dto';
import { UserTokenDto } from '../dtos/user-token.dto';

// Main section

export class UserRegisteredResponse {
  @ApiProperty({ default: 201 })
  statusCode = 201; // HTTP 상태 코드

  @ApiProperty({ default: '유저 등록이 완료하였습니다.' })
  message: string = '유저 등록을 완료하였습니다.'; // 상세 메세지

  @ApiProperty()
  data: UserTokenDto;

  constructor(user: UserEntity, token: TokenDto) {
    this.data = {
      ...user,
      ...token,
    };
  }
}
