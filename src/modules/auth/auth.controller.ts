import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiTag } from '../../constants/api-tag';
import { UserService } from '../user/services/user.service';
import { AuthService } from './auth.service';
import { UserLoginedResponse } from '../user/responses/user-logined.response';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserRegisteredResponse } from '../user/responses/user-registered.response';
import { UserLoginDto } from './dtos/user-login.dto';
import { UserEntity } from '../user/entities/user.entity';
import { TokenDto } from './dtos/token.dto';

@Controller('auth')
@ApiTags(ApiTag.AUTH)
export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '유저 등록 API',
    description: '유저 등록하는 API 입니다.',
  })
  @ApiCreatedResponse({ description: '유저등록 성공시 결과 예시', type: UserRegisteredResponse })
  async signup(@Request() req, @Body() createUserDto: CreateUserDto) {
    let user: UserEntity = await this.userService.findOne({ key: createUserDto.key });
    if (user) {
      throw new UnauthorizedException('이미 등록된 유저입니다');
    }
    user = await this.userService.create(createUserDto);

    const token: TokenDto = await this.authService.createAccessToken({
      id: user.id,
      role: user.role,
    });

    return new UserRegisteredResponse(user, token);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '로그인 API',
    description: '로그인하는 API 입니다.',
  })
  @ApiOkResponse({ description: '로그인 성공시 결과 예시', type: UserLoginedResponse })
  async login(@Request() req, @Body() userLoginDto: UserLoginDto) {
    const user: UserEntity = await this.userService.findOneOrFail({ id: userLoginDto.id });

    const token = await this.authService.createAccessToken({
      id: user.id,
      role: user.role,
    });

    return new UserLoginedResponse(user, token);
  }
}
