// Typeorm
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

// Service
import { IamportService } from '../../../shared/services/iamport.service';

// Entity
import { PaymentPrepareEntity } from '../entities/payment-prepare.entity';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { UserEntity } from '../../user/entities/user.entity';

// Main section

@EventSubscriber()
export class PaymentPrepareSubscriber implements EntitySubscriberInterface<PaymentPrepareEntity> {
  constructor(connection: Connection, private readonly iamportService: IamportService) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return PaymentPrepareEntity;
  }

  async registerIamport(event) {
    // Variable section
    const paymentPrepare: PaymentPrepareEntity = event.entity;
    const user: UserEntity = await event.manager
      .getRepository(UserEntity)
      .findOneOrFail({ id: paymentPrepare.sellerId });

    const merchantUid = this.iamportService.getMerchantUid(user.key);

    // Main section
    const data = {
      merchant_uid: merchantUid,
      amount: paymentPrepare.amount,
    };
    const response = await this.iamportService.iamport.payment.prepare(data);
    console.log('response', response);
    paymentPrepare.merchantUid = response.merchant_uid;
    console.log('paymentPrepare', paymentPrepare);
  }

  // Listener section

  async beforeInsert(event: InsertEvent<PaymentPrepareEntity>) {
    await this.registerIamport(event);
  }

  beforeUpdate(event: UpdateEvent<PaymentPrepareEntity>) {
    throw new ForbiddenException();
  }
}
