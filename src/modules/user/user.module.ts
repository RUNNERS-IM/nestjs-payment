import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { SellerRepository } from './repositories/seller.repository';
import { BuyerRepository } from './repositories/buyer.repository';
import { SellerService } from './services/seller.service';
import { BuyerService } from './services/buyer.service';
import { BuyerController } from './controllers/buyer.controller';
import { SellerController } from './controllers/seller.controller';
import { PaymentModule } from '../payment/payment.module';
import { UserSubscriber } from './subscribers/user.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, SellerRepository, BuyerRepository]),
    PaymentModule,
  ],
  controllers: [UserController, SellerController, BuyerController],
  exports: [UserService, SellerService, BuyerService],
  providers: [UserService, SellerService, BuyerService, UserSubscriber],
})
export class UserModule {}
