import { EntityRepository, Repository } from 'typeorm';

import { CardEntity } from '../entities/card.entity';

@EntityRepository(CardEntity)
export class CardRepository extends Repository<CardEntity> {}
