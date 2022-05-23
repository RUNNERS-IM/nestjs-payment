import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiTag } from '../../../constants/api-tag';
import { UserService } from '../services/user.service';
import { ApiPath } from '../../../constants/api-path';

@Controller(ApiPath.API + 'users')
@ApiTags(ApiTag.USER)
export class UserController {
  constructor(private userService: UserService) {}
}
