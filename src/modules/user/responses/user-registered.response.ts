// Constant
import { ApiProperty } from '@nestjs/swagger';

// Dto
import { UserDto } from '../dtos/user.dto';

// Entity
import { UserEntity } from '../entities/user.entity';
import { TokenDto } from '../../auth/dtos/token.dto';

// Main section
export class UserRegisteredResponse {
  @ApiProperty({ default: 201 })
  statusCode = 201; // HTTP 상태 코드

  @ApiProperty({ default: '유저 등록이 완료하였습니다.' })
  message: string = '유저 등록을 완료하였습니다.'; // 상세 메세지

  @ApiProperty()
  data: { user: UserDto; token: TokenDto };

  constructor(user: UserEntity, token: TokenDto) {
    this.data = {
      user: new UserDto(user),
      token: token,
    };
  }
}
