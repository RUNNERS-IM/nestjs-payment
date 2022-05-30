// Typeorm
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
// Entity
import { CardEntity } from '../entities/card.entity';
import { IamportService } from '../../../shared/services/iamport.service';
import { UserEntity } from '../../user/entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';

// Axios

// Main section

@EventSubscriber()
export class CardSubscriber implements EntitySubscriberInterface<CardEntity> {
  constructor(connection: Connection, private readonly iamportService: IamportService) {
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
      card_number: card.cardNumber,
      expiry: card.expiry,
      birth: card.birth,
      pwd_2digit: card.pwd2digit,
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
      console.log('response', response);
      card.customerUid = response.customer_uid;
      card.pgId = response.pg_id;
      card.pgProvider = response.pg_provider;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  setCardNumber(event) {
    // Variable section
    const card: CardEntity = event.entity;

    // Main section
    const cardNumber = card.cardNumber.replace(/\D/g, '');
    card.cardNumber = cardNumber;
    const lastCardNumber = cardNumber.slice(cardNumber.length - 4);
    card.lastCardNumber = lastCardNumber;
  }

  // Listener section
  async beforeInsert(event: InsertEvent<CardEntity>) {
    this.setExpiry(event);
    await this.setIamportBillingKey(event);
    this.setCardNumber(event);
  }

  beforeUpdate(event: UpdateEvent<CardEntity>) {
    throw new ForbiddenException();
  }
}
