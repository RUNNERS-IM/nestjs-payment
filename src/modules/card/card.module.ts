import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardController } from './controllers/card.controller';
import { CardRepository } from './repositories/card.repository';
import { CardService } from './services/card.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardRepository])],
  controllers: [CardController],
  exports: [CardService],
  providers: [CardService],
})
export class CardModule {}
