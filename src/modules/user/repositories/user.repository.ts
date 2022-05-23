// Typeorm
import { EntityRepository, Repository } from 'typeorm';

// Entity
import { UserEntity } from '../entities/user.entity';

// Main section
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
