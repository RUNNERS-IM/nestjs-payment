import { Injectable } from '@nestjs/common';
import { IamportService } from '../../../shared/services/iamport.service';
import { PaymentPrepareRepository } from '../repositories/payment-prepare.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../../../common/crud.service';
import { PaymentPrepareEntity } from '../entities/payment-prepare.entity';

@Injectable()
export class PaymentPrepareService extends CrudService<PaymentPrepareEntity> {
  constructor(
    @InjectRepository(PaymentPrepareRepository)
    private paymentPrepareRepository: PaymentPrepareRepository,
    private iamportService: IamportService,
  ) {
    super(paymentPrepareRepository);
  }
}
