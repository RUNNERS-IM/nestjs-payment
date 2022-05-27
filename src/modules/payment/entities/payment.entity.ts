// Nestjs
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Typeorm
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

// Common
import { AbstractEntity } from '../../../common/abstract.entity';

// Constants
// Third party
import { IsNumber, IsPositive, IsString, IsUUID, ValidateNested } from 'class-validator';

// Entity
import { CardEntity } from '../../card/entities/card.entity';
import { Type } from 'class-transformer';
import { PaymentPrepareEntity } from './payment-prepare.entity';
import { sampleUuid } from '../../../constants/sample';
import { UserEntity } from '../../user/entities/user.entity';
import { PaymentCancelEntity } from './payment-cancel.entity';

// Main Section
@Entity({ name: 'payments' })
export class PaymentEntity extends AbstractEntity {
  // ManyToOne fields
  @Type(() => UserEntity)
  @ValidateNested()
  @ManyToOne(() => UserEntity, (seller) => seller.paymentsSold, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'sellerId' })
  seller: UserEntity;

  @Type()
  @ApiProperty({ type: 'string', default: sampleUuid })
  @IsUUID()
  @Column({ type: 'uuid', nullable: false })
  sellerId: Uuid;

  @Type(() => UserEntity)
  @ValidateNested()
  @ManyToOne(() => UserEntity, (buyer) => buyer.paymentsBought, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'buyerId' })
  buyer: UserEntity;

  @Type()
  @ApiProperty({ type: 'string', default: sampleUuid })
  @IsUUID()
  @Column({ type: 'uuid', nullable: false })
  buyerId: Uuid;

  @Type(() => CardEntity)
  @ValidateNested()
  @ManyToOne(() => CardEntity, (card) => card.payments, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'cardId' })
  card: CardEntity;

  @Type()
  @ApiProperty({ type: 'string', default: sampleUuid })
  @IsUUID()
  @Column({ type: 'uuid', nullable: true })
  cardId: Uuid;

  // OneToOne fields
  @Type(() => PaymentPrepareEntity)
  @ValidateNested()
  @OneToOne(() => PaymentPrepareEntity, (paymentPrepare) => paymentPrepare.payment)
  @JoinColumn({ name: 'userId' })
  paymentPrepare: PaymentPrepareEntity;

  @Type()
  @ApiProperty({ type: 'string', description: '유저 id', default: sampleUuid })
  @IsUUID()
  @Column({ nullable: false })
  paymentPrepareId: Uuid;

  // OneToMany fields
  @Type(() => PaymentCancelEntity)
  @ValidateNested({ each: true })
  @OneToMany(() => PaymentCancelEntity, (paymentCancel) => paymentCancel.payment)
  paymentCancels: PaymentCancelEntity[];

  // Iamport fields
  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  impUid?: string;

  @ApiPropertyOptional({ type: 'string', description: '가맹점 거래 고유번호' })
  @IsString()
  @Column({ nullable: true })
  merchantUid?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  payMethod?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  channel?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  pgProvider?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  embPgProvider?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  pgTid?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  pgId?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  escrow?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  applyNum?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  bankCode?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  bankName?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  cardCode?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  cardName?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @Column({ nullable: true })
  cardQuota?: number;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  cardNumber?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  cardType?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  vbankCode?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  vbankName?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  vbankNum?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  vbankHolder?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @Column({ nullable: true })
  vbankDate?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @Column({ nullable: true })
  vbankIssuedAt?: number;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  name?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @Column({ nullable: true })
  amount?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @Column({ nullable: true })
  cancelAmount?: number;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  currency?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  buyerName?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  buyerEmail?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  buyerTel?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  buyerAddr?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  buyerPostcode?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  customData?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  userAgent?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  status?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @Column({ nullable: true })
  startedAt?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @Column({ nullable: true })
  paidAt?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @Column({ nullable: true })
  failedAt?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @Column({ nullable: true })
  cancelledAt?: number;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  failReason?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  cancelReason?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  receiptUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  cashReceiptIssued?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  customerUid?: string;

  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: true })
  customerUidUsage?: string;
}
