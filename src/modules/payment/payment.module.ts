import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentController } from './controllers/payment.controller';
import { PaymentRepository } from './repositories/payment.repository';
import { PaymentService } from './services/payment.service';
import { PaymentPrepareController } from './controllers/payment-prepare.controller';
import { PaymentPrepareRepository } from './repositories/payment-prepare.repository';
import { PaymentCancelService } from './services/payment-cancel.service';
import { PaymentPrepareService } from './services/payment-prepare.service';
import { PaymentCancelController } from './controllers/payment-cancel.controller';
import { PaymentCancelRepository } from './repositories/payment-cancel.repository';
import { PaymentPrepareSubscriber } from './subscribers/payment-prepare.subscriber';
import { PaymentSubscriber } from './subscribers/payment.subscriber';
import { CardModule } from '../card/card.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentRepository,
      PaymentPrepareRepository,
      PaymentCancelRepository,
    ]),
    CardModule,
  ],
  controllers: [PaymentController, PaymentPrepareController, PaymentCancelController],
  exports: [PaymentService, PaymentPrepareService, PaymentCancelService],
  providers: [
    PaymentService,
    PaymentPrepareService,
    PaymentCancelService,
    PaymentPrepareSubscriber,
    PaymentSubscriber,
  ],
})
export class PaymentModule {}
