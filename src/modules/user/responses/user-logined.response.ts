// Constant
import { ApiProperty } from '@nestjs/swagger';

// Dto
import { TokenDto } from '../../auth/dtos/token.dto';

// Main section
export class UserLoginedResponse {
  @ApiProperty({ default: 200 })
  statusCode = 200; // HTTP 상태 코드

  @ApiProperty({ default: '상세 조회를 완료하였습니다.' })
  message: string = '객체 상세 조회를 완료하였습니다.'; // 상세 메세지

  @ApiProperty()
  data: TokenDto;

  constructor(token: TokenDto) {
    this.data = token;
  }
}
