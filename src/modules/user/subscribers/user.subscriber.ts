// Nestjs
// Typeorm
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

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

  async afterInsert(event: InsertEvent<UserEntity>) {}
}
