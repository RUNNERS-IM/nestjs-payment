// Typeorm
import { EntityRepository, Repository } from 'typeorm';

// Entity
import { SellerEntity } from '../entities/seller.entity';

// Main section
@EntityRepository(SellerEntity)
export class SellerRepository extends Repository<SellerEntity> {}
