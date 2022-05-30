// Nestjs
import { ApiProperty } from '@nestjs/swagger';

// Typeorm
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

// Third party
import { IsNumber, IsUUID, ValidateNested } from 'class-validator';

// Entity
import { AbstractEntity } from '../../../common/abstract.entity';
import { PaymentEntity } from './payment.entity';

// Constants
import { sampleUuid } from '../../../constants/sample';
import { Type } from 'class-transformer';

// Main section
@Entity({ name: 'payment_cancels' })
export class PaymentCancelEntity extends AbstractEntity {
  // ManyToOne fields
  @Type(() => PaymentEntity)
  @ValidateNested()
  @ManyToOne(() => PaymentEntity, (payment) => payment.paymentCancels, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'sellerId' })
  payment: PaymentEntity;

  @Type()
  @ApiProperty({ type: 'string', default: sampleUuid })
  @IsUUID()
  @Column({ type: 'uuid', default: sampleUuid })
  paymentId: Uuid;

  // Basic fields
  @ApiProperty({ type: 'number', default: 1000 })
  @IsNumber()
  @Column({ nullable: true })
  amount: number;
}
