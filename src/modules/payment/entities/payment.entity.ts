// Nestjs
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Typeorm
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

// Common
import { AbstractEntity } from '../../../common/abstract.entity';

// Constants
// Third party
import { Allow, IsUUID } from 'class-validator';

// Entity
import { SellerEntity } from '../../user/entities/seller.entity';
import { BuyerEntity } from '../../user/entities/buyer.entity';

// Main Section
@Entity({ name: 'payments' })
export class PaymentEntity extends AbstractEntity {
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

  // Iamport fields
  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  imp_uid?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  merchant_uid?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  pay_method?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  channel?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  pg_provider?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  emb_pg_provider?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  pg_tid?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  pg_id?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  escrow?: boolean;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  apply_num?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  bank_code?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  bank_name?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  card_code?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  card_name?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  card_quota?: number;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  card_number?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  card_type?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  vbank_code?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  vbank_name?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  vbank_num?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  vbank_holder?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  vbank_date?: number;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  vbank_issued_at?: number;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  name?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  amount?: number;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  cancel_amount?: number;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  currency?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  buyer_name?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  buyer_email?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  buyer_tel?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  buyer_addr?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  buyer_postcode?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  custom_data?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  user_agent?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  status?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  started_at?: number;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  paid_at?: number;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  failed_at?: number;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  cancelled_at?: number;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  fail_reason?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  cancel_reason?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  receipt_url?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  cash_receipt_issued?: boolean;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  customer_uid?: string;

  @Allow()
  @ApiPropertyOptional()
  @Column({ nullable: true })
  customer_uid_usage?: string;
}
