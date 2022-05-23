import { EntityRepository, Repository } from 'typeorm';

import { PaymentEntity } from '../entities/payment.entity';

@EntityRepository(PaymentEntity)
export class PaymentRepository extends Repository<PaymentEntity> {}
