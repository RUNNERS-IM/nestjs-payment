import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';

import type { UserSettingsEntity } from '../user-settings.entity';
import { UserSettingsRepository } from '../user-settings.repository';

export class SetIsPasswordHashedCommand implements ICommand {
  constructor(public readonly userId: Uuid) {}
}

@CommandHandler(SetIsPasswordHashedCommand)
export class SetIsPasswordHashedHandler
  implements ICommandHandler<SetIsPasswordHashedCommand, UserSettingsEntity>
{
  constructor(private userSettingsRepository: UserSettingsRepository) {}

  async execute(command: SetIsPasswordHashedCommand) {
    const { userId } = command;
    const userSettingsEntity: UserSettingsEntity = await this.userSettingsRepository.findOne({
      userId,
    });

    userSettingsEntity.isPasswordHashed = true;

    return this.userSettingsRepository.save(userSettingsEntity);
  }
}
