// Nestjs
import { ApiProperty } from '@nestjs/swagger';

// Typeorm
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

// Entity
import { AbstractEntity } from '../../../common/abstract.entity';
import { IsInt, IsPositive, IsString, IsUUID, ValidateNested } from 'class-validator';
import { sampleUuid } from '../../../constants/sample';
import { PaymentEntity } from './payment.entity';
import { Type } from 'class-transformer';
import { UserEntity } from '../../user/entities/user.entity';

// Main section
@Entity({ name: 'payment_prepares' })
export class PaymentPrepareEntity extends AbstractEntity {
  // ManyToOne fields
  @Type(() => UserEntity)
  @ValidateNested()
  @ManyToOne(() => UserEntity, (seller) => seller.paymentPreparesSold, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'sellerId' })
  seller: UserEntity;

  @Type()
  @ApiProperty({ type: 'string', default: sampleUuid })
  @IsUUID()
  @Column({ type: 'uuid' })
  sellerId: Uuid;

  @Type(() => UserEntity)
  @ValidateNested()
  @ManyToOne(() => UserEntity, (buyer) => buyer.paymentPreparesBought, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'buyerId' })
  buyer: UserEntity;

  @Type()
  @ApiProperty({ type: 'string', default: sampleUuid })
  @IsUUID()
  @Column({ type: 'uuid' })
  buyerId: Uuid;

  // Basic fields
  @ApiProperty({ type: 'string' })
  @IsString()
  @Column({ nullable: true })
  merchantUid: string;

  @ApiProperty({ type: 'number', default: 1 })
  @IsInt()
  @IsPositive()
  @Column({ nullable: false })
  productId: number;

  @ApiProperty({ type: 'number' })
  @Column({ nullable: false })
  amount: number;

  // OneToOne fields
  @Type(() => PaymentEntity)
  @ValidateNested()
  @OneToOne(() => PaymentEntity, (payment) => payment.paymentPrepare)
  @JoinColumn({ name: 'userId' })
  payment: PaymentEntity;

  @Type()
  @ApiProperty({ type: 'string', description: '결제 id' })
  @IsUUID()
  @Column({ nullable: true })
  paymentId: Uuid;
}
