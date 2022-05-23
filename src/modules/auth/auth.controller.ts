import { Body, Controller, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiTag } from '../../constants/api-tag';
import { UserService } from '../user/services/user.service';
import { AuthService } from './auth.service';
import { UserLoginedResponse } from '../user/responses/user-logined.response';
import { UserRegisterDto } from './dtos/user-register.dto';
import { UserRegisteredResponse } from '../user/responses/user-registered.response';
import { UserLoginDto } from './dtos/user-login.dto';

@Controller('auth')
@ApiTags(ApiTag.AUTH)
export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '유저등록 API',
    description: '유저등록하는 API 입니다.',
  })
  @ApiCreatedResponse({ description: '유저등록 성공시 결과 예시', type: UserRegisteredResponse })
  async signup(@Request() req, @Body() userRegisterDto: UserRegisterDto) {
    const user = await this.userService.findOneOrCreate({ nemoId: userRegisterDto.nemoId });
    return new UserRegisteredResponse(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '로그인 API',
    description: '로그인하는 API 입니다.',
  })
  @ApiOkResponse({ description: '로그인 성공시 결과 예시', type: UserLoginedResponse })
  async login(@Request() req, @Body() userLoginDto: UserLoginDto) {
    const user = await this.userService.findOne(
      { id: userLoginDto.id },
      { relations: ['buyer', 'seller'] },
    );

    const token = await this.authService.createAccessToken({
      id: user.id,
      role: user.role,
    });

    return new UserLoginedResponse(token);
  }
}
