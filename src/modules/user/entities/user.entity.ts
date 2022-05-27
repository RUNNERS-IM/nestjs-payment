// Nestjs
import { ApiProperty } from '@nestjs/swagger';

// Typeorm
import { Column, Entity, OneToMany } from 'typeorm';

// Third party
import { IsEmail, IsPhoneNumber, IsString, ValidateNested } from 'class-validator';

// Constant
import { RoleType } from '../../../constants';

// Common
import { AbstractEntity } from '../../../common/abstract.entity';

// Entity
import { Type } from 'class-transformer';
import { PaymentEntity } from '../../payment/entities/payment.entity';
import { CardEntity } from '../../card/entities/card.entity';
import { PaymentPrepareEntity } from '../../payment/entities/payment-prepare.entity';

// Main section
@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  // OneToMany fields
  @Type(() => PaymentPrepareEntity)
  @ValidateNested({ each: true })
  @OneToMany(() => PaymentPrepareEntity, (payment) => payment.seller)
  paymentPreparesSold: PaymentPrepareEntity[];

  @Type(() => PaymentPrepareEntity)
  @ValidateNested({ each: true })
  @OneToMany(() => PaymentPrepareEntity, (payment) => payment.buyer)
  paymentPreparesBought: PaymentPrepareEntity[];

  @Type(() => PaymentEntity)
  @ValidateNested({ each: true })
  @OneToMany(() => PaymentEntity, (payment) => payment.seller)
  paymentsSold: PaymentEntity[];

  @Type(() => PaymentEntity)
  @ValidateNested({ each: true })
  @OneToMany(() => PaymentEntity, (payment) => payment.buyer)
  paymentsBought: PaymentEntity[];

  @Type(() => CardEntity)
  @ValidateNested({ each: true })
  @OneToMany(() => CardEntity, (card) => card.user)
  cards: CardEntity[];

  // Basic fields
  @IsString()
  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @ApiProperty({ type: 'string', description: '고유 키', default: 'key-here' })
  @IsString()
  @Column({ unique: true, nullable: false })
  key: string;

  // Basic fields
  @ApiProperty({
    type: 'string',
    description: '이름',
    default: '홍길동',
  })
  @IsString()
  @Column({ nullable: true })
  name: string;

  @ApiProperty({
    type: 'string',
    description: '전화번호',
    default: '01040840660',
  })
  @IsPhoneNumber('KR', { message: '올바른 휴대폰번호를 입력해주세요.' })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({
    type: 'string',
    description: '이메일',
    default: 'sample@test.com',
  })
  @IsEmail({ message: '올바른 이메일을 입력해주세요.' })
  @IsString()
  @Column({ nullable: true })
  email: string;

  @ApiProperty({
    type: 'string',
    description: '주소',
    default: '서울 강남구',
  })
  @IsString()
  @Column({ nullable: true })
  address: string;

  @ApiProperty({
    type: 'string',
    description: '우편번호',
    default: '06325',
  })
  @IsString()
  @Column({ nullable: true })
  postcode: string;
}
