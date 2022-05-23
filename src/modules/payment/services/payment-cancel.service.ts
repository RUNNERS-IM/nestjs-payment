import { Injectable } from '@nestjs/common';
import { PaymentCancelRepository } from '../repositories/payment-cancel.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../../../common/crud.service';
import { PaymentCancelEntity } from '../entities/payment-cancel.entity';

@Injectable()
export class PaymentCancelService extends CrudService<PaymentCancelEntity> {
  constructor(
    @InjectRepository(PaymentCancelRepository)
    private paymentCancelRepository: PaymentCancelRepository,
  ) {
    super(paymentCancelRepository);
  }
}
