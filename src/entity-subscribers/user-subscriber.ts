import { CommandBus } from '@nestjs/cqrs';
import type { EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { EventSubscriber } from 'typeorm';

import { SetIsPasswordHashedCommand } from '../modules/user/commands/set-is-password-hashed.command';
import { UserEntity } from '../modules/user/user.entity';
import type { UserSettingsEntity } from '../modules/user/user-settings.entity';
import { generateHash } from '../utils/hash';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  constructor(private commandBus: CommandBus) {}

  listenTo(): typeof UserEntity {
    return UserEntity;
  }

  beforeInsert(event: InsertEvent<UserEntity>): void {
    if (event.entity.password) {
      event.entity.password = generateHash(event.entity.password);
    }
  }

  async beforeUpdate(event: UpdateEvent<UserEntity>): Promise<void> {
    // FIXME check event.databaseEntity.password
    const entity = event.entity as UserEntity;

    if (entity.password !== event.databaseEntity.password) {
      entity.password = generateHash(entity.password);

      await this.commandBus.execute<SetIsPasswordHashedCommand, UserSettingsEntity>(
        new SetIsPasswordHashedCommand(entity.id),
      );
    }
  }
}
