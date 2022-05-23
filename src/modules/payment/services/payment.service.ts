// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal } from 'typeorm';

// Common
import { CrudService } from '../../../common/crud.service';

// Repository
import { PaymentRepository } from '../repositories/payment.repository';

// Entity
import { PaymentEntity } from '../entities/payment.entity';

// Main section
@Injectable()
export class PaymentService extends CrudService<PaymentEntity> {
  constructor(
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,
  ) {
    super(paymentRepository);
  }

  async getBuyerPayments(buyerId: Uuid) {
    return await this.paymentRepository.find({ buyerId: Equal(buyerId) });
  }

  async getBuyerPayment(paymentId: Uuid, buyerId: Uuid) {
    return await this.paymentRepository.findOne({ buyerId: Equal(buyerId), id: Equal(paymentId) });
  }

  async getSellerPayments(sellerId: Uuid) {
    return await this.paymentRepository.find({ sellerId: Equal(sellerId) });
  }

  async getSellerPayment(paymentId: Uuid, sellerId: Uuid) {
    return await this.paymentRepository.findOne({
      sellerId: Equal(sellerId),
      id: Equal(paymentId),
    });
  }
}
