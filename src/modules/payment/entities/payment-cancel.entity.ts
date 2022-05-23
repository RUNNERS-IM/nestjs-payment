import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { SellerEntity } from '../../user/entities/seller.entity';
import { PaymentEntity } from './payment.entity';

@Entity({ name: 'payment_cancels' })
export class PaymentCancelEntity extends AbstractEntity {
  // ManyToOne fields
  @ApiProperty({ type: 'string' })
  @IsUUID()
  @Column({ type: 'uuid' })
  paymentId: Uuid;

  @ManyToOne(() => SellerEntity, (seller) => seller.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sellerId' })
  payment: PaymentEntity;

  @ApiProperty({ type: 'number' })
  @Column({ nullable: true })
  amount: number;
}
