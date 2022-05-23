// Typeorm
import { EntityRepository, Repository } from 'typeorm';

// Entity
import { BuyerEntity } from '../entities/buyer.entity';

// Main section
@EntityRepository(BuyerEntity)
export class BuyerRepository extends Repository<BuyerEntity> {}
