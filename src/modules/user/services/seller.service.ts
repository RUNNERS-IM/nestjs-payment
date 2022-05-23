// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Common
import { CrudService } from '../../../common/crud.service';

// Repository
import { SellerRepository } from '../repositories/seller.repository';

// Entity
import { SellerEntity } from '../entities/seller.entity';

// Main section
@Injectable()
export class SellerService extends CrudService<SellerEntity> {
  constructor(
    @InjectRepository(SellerRepository)
    private sellerRepository: SellerRepository,
  ) {
    super(sellerRepository);
  }
}
