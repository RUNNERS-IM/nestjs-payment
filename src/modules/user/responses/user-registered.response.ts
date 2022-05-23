// Constant
import { ApiProperty } from '@nestjs/swagger';

// Dto
import { UserRegisteredDto } from '../../auth/dtos/user-registered.dto';
import { UserEntity } from '../entities/user.entity';

// Main section
export class UserRegisteredResponse {
  @ApiProperty({ default: 201 })
  statusCode = 201; // HTTP 상태 코드

  @ApiProperty({ default: '유저 등록이 완료하였습니다.' })
  message: string = '유저 등록을 완료하였습니다.'; // 상세 메세지

  @ApiProperty()
  data: UserRegisteredDto;

  constructor(user: UserEntity) {
    this.data = new UserRegisteredDto(user);
  }
}
