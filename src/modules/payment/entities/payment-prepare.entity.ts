// Nestjs
import { ApiProperty } from '@nestjs/swagger';

// Typeorm
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

// Entity
import { AbstractEntity } from '../../../common/abstract.entity';
import { IsInt, IsPositive, IsUUID } from 'class-validator';
import { SellerEntity } from '../../user/entities/seller.entity';
import { BuyerEntity } from '../../user/entities/buyer.entity';

// Main section
@Entity({ name: 'payment_prepares' })
export class PaymentPrepareEntity extends AbstractEntity {
  // ManyToOne fields
  @ApiProperty({ type: 'string' })
  @IsUUID()
  @Column({ type: 'uuid' })
  sellerId: Uuid;

  @ManyToOne(() => SellerEntity, (seller) => seller.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sellerId' })
  seller: SellerEntity;

  @ApiProperty({ type: 'string' })
  @IsUUID()
  @Column({ type: 'uuid' })
  buyerId: Uuid;

  @ManyToOne(() => BuyerEntity, (buyer) => buyer.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'buyerId' })
  buyer: BuyerEntity;

  // Basic fields
  @ApiProperty({ type: 'string' })
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
}
