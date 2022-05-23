import { Injectable } from '@nestjs/common';
import { CardRepository } from '../repositories/card.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../../../common/crud.service';
import { CardEntity } from '../entities/card.entity';

@Injectable()
export class CardService extends CrudService<CardEntity> {
  constructor(
    @InjectRepository(CardRepository)
    private cardRepository: CardRepository,
  ) {
    super(cardRepository);
  }
}
