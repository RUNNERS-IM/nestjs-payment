// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Common
import { CrudService } from '../../../common/crud.service';

// Repository
import { PaymentRepository } from '../repositories/payment.repository';

// Entity
import { PaymentEntity } from '../entities/payment.entity';

// Main section
@Injectable()
export class PaymentService extends CrudService<PaymentEntity> {
  constructor(
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,
  ) {
    super(paymentRepository);
  }
}
