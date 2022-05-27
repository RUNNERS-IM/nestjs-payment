// Typeorm
import { EntityRepository, Repository } from 'typeorm';

// Entity
import { PaymentEntity } from '../entities/payment.entity';

@EntityRepository(PaymentEntity)
export class PaymentRepository extends Repository<PaymentEntity> {}
