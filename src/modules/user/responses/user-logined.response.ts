// Constant
import { ApiProperty } from '@nestjs/swagger';

// Dto
import { TokenDto } from '../../auth/dtos/token.dto';

// Entity
import { UserEntity } from '../entities/user.entity';
import { UserTokenDto } from '../dtos/user-token.dto';

// Main section
export class UserLoginedResponse {
  @ApiProperty({ default: 200 })
  statusCode = 200; // HTTP 상태 코드

  @ApiProperty({ default: '유저 로그인을 완료하였습니다.' })
  message: string = '유저 로그인을 완료하였습니다.'; // 상세 메세지

  @ApiProperty()
  data: UserTokenDto;

  constructor(user: UserEntity, token: TokenDto) {
    this.data = {
      ...user,
      ...token,
    };
  }
}
