// Typeorm
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

// Common
import { AbstractEntity } from '../../../common/abstract.entity';

// Entity
import { PaymentEntity } from '../../payment/entities/payment.entity';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// Main Section
@Entity({ name: 'sellers' })
export class SellerEntity extends AbstractEntity {
  // OneToOne fields
  @Type(() => UserEntity)
  @ValidateNested()
  @OneToOne(() => UserEntity, (user) => user.seller)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ApiProperty({ type: 'string' })
  @IsUUID()
  @Column({ nullable: false })
  userId: Uuid;

  // OneToMany fields
  @Type(() => PaymentEntity)
  @ValidateNested({ each: true })
  @OneToMany(() => PaymentEntity, (payment) => payment.seller)
  payments: PaymentEntity[];
}
