// Typeorm
import { EntityRepository, Repository } from 'typeorm';

// Entity
import { PaymentCancelEntity } from '../entities/payment-cancel.entity';

@EntityRepository(PaymentCancelEntity)
export class PaymentCancelRepository extends Repository<PaymentCancelEntity> {}
