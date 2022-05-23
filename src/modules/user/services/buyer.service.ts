// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Common
import { CrudService } from '../../../common/crud.service';

// Repository
import { BuyerRepository } from '../repositories/buyer.repository';

// Entity
import { BuyerEntity } from '../entities/buyer.entity';

// Main section
@Injectable()
export class BuyerService extends CrudService<BuyerEntity> {
  constructor(
    @InjectRepository(BuyerRepository)
    private buyerRepository: BuyerRepository,
  ) {
    super(buyerRepository);
  }
}
