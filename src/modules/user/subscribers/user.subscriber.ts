// Nestjs
// Typeorm
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { SellerEntity } from '../entities/seller.entity';
import { BuyerEntity } from '../entities/buyer.entity';

// Axios

// Main section

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return UserEntity;
  }

  async createBuyerSeller(event) {
    // Variable section
    const user: UserEntity = event.entity;

    // Create buyer and seller
    const buyer: BuyerEntity = await event.manager
      .getRepository(BuyerEntity)
      .create({ userId: user.id })
      .save();

    const seller: SellerEntity = await event.manager
      .getRepository(SellerEntity)
      .create({ userId: user.id })
      .save();

    console.log('buyer', buyer);
    console.log('seller', seller);
  }

  // Listener section

  async afterInsert(event: InsertEvent<UserEntity>) {
    await this.createBuyerSeller(event);
  }
}
