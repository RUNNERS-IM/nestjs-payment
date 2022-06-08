// Typeorm
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

// Third party
// Entity
import { CardEntity } from '../entities/card.entity';
import { IamportService } from '../../../shared/services/iamport.service';
import { UserEntity } from '../../user/entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { CryptoService } from '../../../shared/services/crypto.service';

// Main section

@EventSubscriber()
export class CardSubscriber implements EntitySubscriberInterface<CardEntity> {
  constructor(
    connection: Connection,
    private readonly iamportService: IamportService,
    private readonly cryptoService: CryptoService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return CardEntity;
  }

  setExpiry(event) {
    // Variable section
    const card: CardEntity = event.entity;

    // Main section
    card.expiry = String(card.expiryYear) + '-' + String(card.expiryMonth).padStart(2, '0');
  }

  async setIamportBillingKey(event) {
    // Variable section
    const card: CardEntity = event.entity;

    const user: UserEntity = await event.manager
      .getRepository(UserEntity)
      .findOneOrFail({ id: card.userId });

    const customerUid = this.iamportService.getCustomerUid(user.key);

    // Main section
    const data = {
      // Card
      customer_uid: customerUid,
      card_number: this.cryptoService.decode(card.cardNumber),
      expiry: card.expiry,
      birth: this.cryptoService.decode(card.birth),
      pwd_2digit: this.cryptoService.decode(card.pwd2digit),
      cvc: card.cvc,
      // User
      customer_name: user.name,
      customer_tel: user.phone,
      customer_email: user.email,
      customer_addr: user.address,
      customer_postcode: user.postcode,
    };

    try {
      const response = await this.iamportService.iamport.subscribe_customer.create(data);
      card.customerUid = response.customer_uid;
      card.pgId = response.pg_id;
      card.pgProvider = response.pg_provider;
      card.cardName = response.card_name;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  setCardNumber(event) {
    // Variable section
    const card: CardEntity = event.entity;
    let cardNumber = this.cryptoService.decode(card.cardNumber);
    cardNumber = String(cardNumber).replace(/\D/g, '');

    // Main section
    card.lastCardNumber = cardNumber.slice(cardNumber.length - 4);
  }

  // Listener section
  async beforeInsert(event: InsertEvent<CardEntity>) {
    this.setExpiry(event);
    this.setCardNumber(event);
    await this.setIamportBillingKey(event);
  }

  beforeUpdate(event: UpdateEvent<CardEntity>) {
    throw new ForbiddenException();
  }
}
