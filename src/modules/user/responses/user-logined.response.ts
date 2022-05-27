// Constant
import { ApiProperty } from '@nestjs/swagger';

// Dto
import { TokenDto } from '../../auth/dtos/token.dto';
import { UserDto } from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';

// Main section
export class UserLoginedResponse {
  @ApiProperty({ default: 200 })
  statusCode = 200; // HTTP 상태 코드

  @ApiProperty({ default: '상세 조회를 완료하였습니다.' })
  message: string = '객체 상세 조회를 완료하였습니다.'; // 상세 메세지

  @ApiProperty()
  data: { user: UserDto; token: TokenDto };

  constructor(user: UserEntity, token: TokenDto) {
    this.data = {
      user: new UserDto(user),
      token: token,
    };
  }
}
