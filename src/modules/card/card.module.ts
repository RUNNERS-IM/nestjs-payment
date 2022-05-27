// Nestjs
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controller
import { CardController } from './controllers/card.controller';

// Repository
import { CardRepository } from './repositories/card.repository';

// Service
import { CardService } from './services/card.service';

// Subscriber
import { CardSubscriber } from './subscribers/card.subscriber';

// Main section
@Module({
  imports: [TypeOrmModule.forFeature([CardRepository])],
  controllers: [CardController],
  exports: [CardService],
  providers: [CardService, CardSubscriber],
})
export class CardModule {}
