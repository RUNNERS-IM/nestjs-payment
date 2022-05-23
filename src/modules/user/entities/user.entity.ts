// Nestjs
import { ApiProperty } from '@nestjs/swagger';

// Typeorm
import { Column, Entity, OneToOne } from 'typeorm';

// Third party
import { IsInt, IsPositive } from 'class-validator';

// Constant
import { RoleType } from '../../../constants';

// Common
import { AbstractEntity } from '../../../common/abstract.entity';

// Entity
import { SellerEntity } from './seller.entity';
import { BuyerEntity } from './buyer.entity';

// Main section
@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @ApiProperty({ type: 'number', default: 1 })
  @IsInt()
  @IsPositive()
  @Column({ unique: true, nullable: true })
  nemoId: number;

  @OneToOne(() => BuyerEntity, (buyer) => buyer.user)
  buyer?: BuyerEntity;

  @OneToOne(() => SellerEntity, (seller) => seller.user)
  seller?: SellerEntity;
}
