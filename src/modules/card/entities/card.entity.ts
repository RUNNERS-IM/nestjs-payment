// Nestjs
import { ApiProperty } from '@nestjs/swagger';

// Typeorm
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

// Third party
import { Exclude, Type } from 'class-transformer';
import {
  IsCreditCard,
  IsInt,
  IsPositive,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

// Constants
import { sampleUuid } from '../../../constants/sample';
// Entity
import { AbstractEntity } from '../../../common/abstract.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { PaymentEntity } from '../../payment/entities/payment.entity';
import { ExtendedColumnOptions } from 'typeorm-encrypted';
import { encryptionOptions } from '../../../constants/encryption-options';

// Main section
@Entity({ name: 'cards' })
export class CardEntity extends AbstractEntity {
  // OneToOne fields
  @Type(() => UserEntity)
  @ValidateNested()
  @ManyToOne(() => UserEntity, (user) => user.cards)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Type()
  @ApiProperty({ type: 'string', description: '유저 id', default: sampleUuid })
  @IsUUID()
  @Column({ nullable: false })
  userId: Uuid;

  // Basic fields
  @ApiProperty({
    type: 'string',
    description: '카드명',
  })
  @IsString()
  @Column({ nullable: true })
  title: string;

  @ApiProperty({
    type: 'string',
    description:
      'string 타입의 고객 고유번호.\n' +
      '(결제에 사용된 카드정보를 빌링키 형태로 저장해두고 재결제에 사용하시려면 customerUid를 지정해주세요. /subscribe/payments/again, /subscribe/payments/schedule로 재결제를 진행하실 수 있습니다.)',
  })
  @Exclude({ toPlainOnly: true })
  @IsString()
  @Column({ nullable: true })
  customerUid: string;

  @ApiProperty({
    type: 'string',
    description: '카드번호(dddd-dddd-dddd-dddd)',
    default: '1234-5678-1234-5678',
  })
  @Exclude({ toPlainOnly: true })
  @IsCreditCard()
  @Column(<ExtendedColumnOptions>{
    type: 'varchar',
    nullable: false,
    encrypt: encryptionOptions,
  })
  cardNumber: string;

  @ApiProperty({
    type: 'number',
    description: '카드 유효기간(YYYY)',
    default: new Date().getFullYear(),
  })
  @Exclude({ toPlainOnly: true })
  @IsInt()
  @IsPositive()
  @Min(2022)
  @Max(2999)
  @Column({ nullable: false })
  expiryYear: number;

  @ApiProperty({
    type: 'number',
    description: '카드 유효기간 월(MM)',
    default: new Date().getMonth() + 1,
  })
  @Exclude({ toPlainOnly: true })
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(12)
  @Column({ nullable: false })
  expiryMonth: number;

  @ApiProperty({
    type: 'string',
    description: '카드 유효기간(YYYY-MM)',
  })
  @IsString()
  @Length(7, 7)
  @Column({ nullable: true })
  expiry: string;

  @ApiProperty({
    type: 'string',
    description: '생년월일6자리(법인카드의 경우 사업자등록번호10자리)',
    default: '920426',
  })
  @Exclude({ toPlainOnly: true })
  @IsString()
  @Length(6, 10)
  @Column(<ExtendedColumnOptions>{
    type: 'varchar',
    nullable: false,
    encrypt: encryptionOptions,
  })
  birth: string;

  @ApiProperty({
    type: 'string',
    description: '카드비밀번호 앞 2자리',
    default: '12',
  })
  @Exclude({ toPlainOnly: true })
  @IsString()
  @Length(2, 2)
  @Column(<ExtendedColumnOptions>{
    type: 'varchar',
    nullable: false,
    encrypt: encryptionOptions,
  })
  pwd2digit: string;

  @ApiProperty({
    type: 'string',
    description: '카드 인증번호(CVC)',
    default: '123',
  })
  @Exclude({ toPlainOnly: true })
  @IsString()
  @Length(3, 4)
  @Column(<ExtendedColumnOptions>{
    type: 'varchar',
    nullable: false,
    encrypt: encryptionOptions,
  })
  cvc: string;

  @ApiProperty({
    type: 'string',
    description: '카드번호 마지막 4자리',
    default: '1234',
  })
  @IsString()
  @Length(4, 4)
  @Column({ nullable: true })
  lastCardNumber: string;

  @ApiProperty({
    type: 'string',
    description: '카드명',
    default: 'Card Company',
  })
  @IsString()
  @Column({ nullable: true })
  cardName: string;

  @ApiProperty({
    type: 'string',
    description: 'PG ID',
    default: 'PG ID',
  })
  @Exclude({ toPlainOnly: true })
  @IsString()
  @Column({ nullable: true })
  pgId: string;

  @ApiProperty({
    type: 'string',
    description: 'PG',
    default: 'PG',
  })
  @Exclude({ toPlainOnly: true })
  @IsString()
  @Column({ nullable: true })
  pgProvider: string;

  // OneToMany fields
  @Type(() => PaymentEntity)
  @ValidateNested({ each: true })
  @OneToMany(() => PaymentEntity, (payment) => payment.card)
  payments: PaymentEntity[];
}
