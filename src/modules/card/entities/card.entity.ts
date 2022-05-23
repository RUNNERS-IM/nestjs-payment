import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';

@Entity({ name: 'payments' })
export class CardEntity extends AbstractEntity {
  @Column({ nullable: true })
  customer_uid: string;
}
