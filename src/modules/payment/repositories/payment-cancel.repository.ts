import { EntityRepository, Repository } from 'typeorm';
import { PaymentCancelEntity } from '../entities/payment-cancel.entity';

@EntityRepository(PaymentCancelEntity)
export class PaymentCancelRepository extends Repository<PaymentCancelEntity> {}
