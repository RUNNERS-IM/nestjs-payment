import { EntityRepository, Repository } from 'typeorm';

import {PaymentPrepareEntity} from "../entities/payment-prepare.entity";

@EntityRepository(PaymentPrepareEntity)
export class PaymentPrepareRepository extends Repository<PaymentPrepareEntity> {}
