import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiTag } from '../../../constants/api-tag';
import { UserService } from '../services/user.service';
import { ApiPath } from '../../../constants/api-path';
import { UserUpdateResponse } from '../responses/user.response';
import { Auth, AuthUser } from '../../../decorators';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { RoleType } from '../../../constants';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';

@Controller(ApiPath.API + 'users')
@ApiTags(ApiTag.USER)
export class UserController {
  constructor(private userService: UserService) {}

  @Patch(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '유저 수정 API',
    description: '유저 수정하는 API 입니다.',
  })
  @ApiOkResponse({ description: '유저 수정 성공시 결과 예시', type: UserUpdateResponse })
  async update(
    @AuthUser() user: UserEntity,
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: Uuid,
  ) {
    if (user.id != id) throw new ForbiddenException();

    await this.userService.update(id, updateUserDto);
    const userUpdated = await this.userService.findOneOrFail(id);

    return new UserUpdateResponse(userUpdated);
  }
}
