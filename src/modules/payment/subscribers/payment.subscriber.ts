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
import { PaymentEntity } from '../entities/payment.entity';
import { CardEntity } from '../../card/entities/card.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';

// Main section

@EventSubscriber()
export class PaymentSubscriber implements EntitySubscriberInterface<PaymentEntity> {
  constructor(connection: Connection, private readonly iamportService: IamportService) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return PaymentEntity;
  }

  responseToPayment(response, payment: PaymentEntity) {
    // Set payment
    payment.applyNum = response.apply_num;
    payment.bankCode = response.bank_code;
    payment.bankName = response.bank_name;
    payment.buyerAddr = response.buyerAddr;
    payment.buyerEmail = response.buyer_email;
    payment.buyerName = response.buyer_name;
    payment.buyerPostcode = response.buyer_postcode;
    payment.buyerTel = response.buyer_tel;
    payment.cancelAmount = response.cancel_amount;
    payment.cancelReason = response.cancel_reason;
    payment.cancelledAt = response.cancelled_at;
    payment.cardCode = response.card_code;
    payment.cardName = response.card_name;
    payment.cardNumber = response.card_number;
    payment.cardQuota = response.card_quota;
    payment.cardType = response.card_type;
    payment.cashReceiptIssued = response.cash_receipt_issued;
    payment.channel = response.channel;
    payment.customData = response.custom_data;
    payment.customerUid = response.customer_uid;
    payment.customerUidUsage = response.customer_uid_usage;
    payment.embPgProvider = response.emb_pg_provider;
    payment.escrow = response.escrow;
    payment.failReason = response.fail_reason;
    payment.failedAt = response.failed_at;
    payment.impUid = response.imp_uid;
    payment.merchantUid = response.merchant_uid;
    payment.name = response.name;
    payment.paidAt = response.paid_at;
    payment.payMethod = response.pay_method;
    payment.pgId = response.pg_id;
    payment.pgProvider = response.pg_provider;
    payment.pgTid = response.pg_tid;
    payment.receiptUrl = response.receipt_url;
    payment.startedAt = response.started_at;
    payment.userAgent = response.user_agent;
    payment.vbankCode = response.vbank_code;
    payment.vbankDate = response.vbank_date;
    payment.vbankHolder = response.vbank_holder;
    payment.vbankIssuedAt = response.vbank_issued_at;
    payment.vbankName = response.vbank_name;
    payment.vbankNum = response.vbank_num;
  }

  async checkPaidIamport(event) {
    // Variable section
    const payment: PaymentEntity = event.entity;

    // Get paymentPrepare
    const paymentPrepareRepository = event.manager.getRepository(PaymentPrepareEntity);
    const paymentPrepare: PaymentPrepareEntity = await paymentPrepareRepository.findOneOrFail(
      payment.paymentPrepareId,
    );

    // Get buyer
    const userRepository = await event.manager.getRepository(UserEntity);
    const user: UserEntity = await userRepository.findOneOrFail(payment.buyerId);

    // Check buyer
    if (user.id != paymentPrepare.buyerId) throw new UnauthorizedException();

    // Main section
    const data = {
      imp_uid: payment.impUid,
    };
    const response = await this.iamportService.payment.getByImpUid(data);
    payment.sellerId = paymentPrepare.sellerId;
    this.responseToPayment(response, payment);
  }

  async payIamport(event) {
    // Variable section
    const payment: PaymentEntity = event.entity;

    // Get card
    const cardRepository = event.manager.getRepository(CardEntity);
    const card: CardEntity = await cardRepository.findOneOrFail(payment.cardId);

    // Get paymentPrepare
    const paymentPrepareRepository = event.manager.getRepository(PaymentPrepareEntity);
    const paymentPrepare: PaymentPrepareEntity = await paymentPrepareRepository.findOneOrFail(
      payment.paymentPrepareId,
    );

    // Get buyer
    const userRepository = await event.manager.getRepository(UserEntity);
    const user: UserEntity = await userRepository.findOneOrFail(payment.buyerId);

    // Check buyer
    if (user.id != card.userId) throw new UnauthorizedException();
    if (user.id != paymentPrepare.buyerId) throw new UnauthorizedException();

    // Main section
    const data = {
      customer_uid: card.customerUid,
      merchant_uid: paymentPrepare.merchantUid,
      amount: paymentPrepare.amount,
      name: paymentPrepare.productId,
    };
    const response = await this.iamportService.subscribe.again(data);
    this.responseToPayment(response, payment);
  }

  // Listener section
  async beforeInsert(event: InsertEvent<PaymentEntity>) {
    const payment: PaymentEntity = event.entity;

    if (payment.impUid) {
      await this.checkPaidIamport(event);
    } else {
      await this.payIamport(event);
    }
  }

  beforeUpdate(event: UpdateEvent<PaymentEntity>) {
    throw new ForbiddenException();
  }
}
