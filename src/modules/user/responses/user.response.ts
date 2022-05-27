// Nestjs
import { ApiPropertyOptional } from '@nestjs/swagger';

// Response
import {
  CreateResponse,
  ListResponse,
  RetrieveResponse,
  UpdateResponse,
} from '../../../constants/response';

// Entity
import { UserEntity } from '../entities/user.entity';

// Main section
export class UserCreateResponse extends CreateResponse<UserEntity> {
  @ApiPropertyOptional({ type: UserEntity })
  data?: UserEntity; // 결과 데이터
}
export class UserListResponse extends ListResponse<UserEntity> {
  @ApiPropertyOptional({ type: [UserEntity], isArray: true })
  data?: UserEntity[]; // 결과 데이터
}
export class UserRetrieveResponse extends RetrieveResponse<UserEntity> {
  @ApiPropertyOptional({ type: UserEntity })
  data?: UserEntity; // 결과 데이터
}
export class UserUpdateResponse extends UpdateResponse<UserEntity> {
  @ApiPropertyOptional({ type: UserEntity })
  data?: UserEntity; // 결과 데이터
}
