import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { PaymentModule } from '../payment/payment.module';
import { UserSubscriber } from './subscribers/user.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), PaymentModule],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, UserSubscriber],
})
export class UserModule {}
