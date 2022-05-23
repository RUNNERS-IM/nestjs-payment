// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Common
import { CrudService } from '../../../common/crud.service';

// Repository
import { UserRepository } from '../repositories/user.repository';

// Entity
import { UserEntity } from '../entities/user.entity';

// Main section
@Injectable()
export class UserService extends CrudService<UserEntity> {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super(userRepository);
  }
}
